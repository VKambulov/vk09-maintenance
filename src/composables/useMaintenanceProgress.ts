import { onUnmounted, ref } from 'vue'
import { progressMeta, timelineSteps } from '../config/maintenance.config'

/**
 * Парсит строку времени «HH:MM:SS» в секунды.
 */
function parseTime(str: string): number {
  const parts = str.split(':').map(Number) as number[]
  return (parts[0]!) * 3600 + (parts[1]!) * 60 + (parts[2] ?? 0)
}

/**
 * Форматирует секунды в строку HH:MM:SS.
 */
function formatTime(totalSeconds: number): string {
  if (totalSeconds <= 0) return '00:00:00'

  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

/**
 * Форматирует число МБ в читаемую строку (MB / GB).
 */
function formatPackets(mb: number): string {
  if (mb >= 1024) {
    return (mb / 1024).toFixed(2) + ' GB'
  }
  return Math.floor(mb) + ' MB'
}

/**
 * Вычисляет прогресс и текущий процесс на основе шагов таймлайна.
 *
 * - Процент = (кол-во completed) / (общее кол-во шагов) × 100
 * - Текущий процесс = шаг со статусом «active»
 * - EST. TIME — обратный отсчёт от значения в конфиге
 * - PACKETS — плавно накапливаются с заданной скоростью
 */
export function useMaintenanceProgress() {
  const total = timelineSteps.length
  const completed = timelineSteps.filter((s) => s.status === 'completed').length
  const activeStep = timelineSteps.find((s) => s.status === 'active')

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  const processName = activeStep?.title ?? 'Ожидание'
  const label = activeStep?.detail ?? 'Все задачи завершены'

  // Обратный отсчёт времени
  let remaining = parseTime(progressMeta.estTime)
  const estTime = ref(formatTime(remaining))

  // Накопление пакетов
  let currentPackets = progressMeta.packetsStart
  const packets = ref(formatPackets(currentPackets))

  const timer = setInterval(() => {
    if (remaining > 0) {
      remaining--
      estTime.value = formatTime(remaining)
    }

    currentPackets += progressMeta.packetsSpeed
    packets.value = formatPackets(currentPackets)
  }, 1000)

  onUnmounted(() => clearInterval(timer))

  return {
    /** Процент завершения (0–100) */
    percent,

    /** Название текущего процесса (из активного шага таймлайна) */
    processName,

    /** Описание текущей задачи (detail активного шага) */
    label,

    /** Оставшееся время (реактивный обратный отсчёт) */
    estTime,

    /** Объём данных (реактивное накопление) */
    packets,

    /** Общее кол-во шагов */
    total,

    /** Кол-во завершённых шагов */
    completed,
  }
}
