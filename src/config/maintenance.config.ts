/**
 * Конфигурация страницы обслуживания.
 *
 * Отредактируйте значения ниже, пересоберите проект — и страница
 * автоматически отобразит актуальное состояние прогресса.
 */

// ─── Прогресс-бар (дополнительные поля) ──────────────────────
// Процент и текущий процесс вычисляются автоматически из таймлайна.
// Здесь только то, что нельзя вычислить.
export const progressMeta = {
  /** Оставшееся время (формат HH:MM:SS) */
  estTime: '2878:45:26',

  /** Начальный объём обработанных данных (МБ) */
  packetsStart: 402,

  /** Скорость набора данных (МБ/сек, дробное число) */
  packetsSpeed: 0.3,
} as const

// ─── Релиз / Версия ─────────────────────────────────────────
export const release = {
  /** Версия сборки */
  build: 'v2.0.0-alpha.1',

  /** Версия Node.js */
  node: 'v25.6.1',

  /** Версия фреймворка */
  framework: 'Nuxt v4.3.1',

  /** Версия контент-модуля */
  content: 'Nuxt Content v3.11.2',
} as const

// ─── Технологический стек ────────────────────────────────────
export const stack = {
  runtime: 'Node.js',
  framework: 'Nuxt.js',
  content: 'Nuxt Content',
  deploy: 'Статическая генерация',
} as const

// ─── Таймлайн (этапы разработки) ─────────────────────────────
export type TimelineStepStatus = 'completed' | 'active' | 'pending'

export interface TimelineStep {
  /** Название шага */
  title: string
  /** Подзаголовок (время завершения, «Pending» и т.д.) */
  subtitle: string
  /** Статус: completed / active / pending */
  status: TimelineStepStatus
  /** Детали для активного шага (оранжевая строка) */
  detail?: string
  /** Вторичные детали (серая строка) */
  detailSecondary?: string
}

/**
 * Шаги разработки сайта-портфолио / блога.
 *
 * Процент прогресса вычисляется автоматически:
 *   completed шаги / общее кол-во шагов × 100
 *
 * Текущий процесс берётся из шага со статусом «active».
 */
export const timelineSteps: TimelineStep[] = [
  {
    title: 'Дизайн и прототип',
    subtitle: 'В процессе',
    status: 'active',
    detail: 'Разработка макетов...',
    detailSecondary: 'Экраны: 0/6',
  },
  {
    title: 'Верстка и компоненты',
    subtitle: 'Ожидание',
    status: 'pending',
    detail: 'Сборка UI-компонентов...',
    detailSecondary: 'Компоненты: 0/12',
  },
  {
    title: 'Контент и наполнение',
    subtitle: 'Ожидание',
    status: 'pending',
    detail: 'Написание текстов и статей...',
    detailSecondary: 'Страницы: 0/8',
  },
  {
    title: 'Тестирование и оптимизация',
    subtitle: 'Ожидание',
    status: 'pending',
    detail: 'Lighthouse, кросс-браузерность...',
    detailSecondary: 'Оценка производительности: —',
  },
  {
    title: 'Деплой и запуск',
    subtitle: 'Ожидание',
    status: 'pending',
    detail: 'Сборка и публикация на хостинге...',
    detailSecondary: 'CI/CD конвейер',
  },
]

// ─── Контакты ────────────────────────────────────────────────
export const contacts = {
  /** Ссылка для кнопки «Email» (mailto:...) */
  email: 'mailto:me@vk09.ru',

  /** Текст кнопки Email */
  emailLabel: 'Написать Email',

  /** Ссылка для кнопки «Telegram» (https://t.me/...) */
  telegram: 'https://t.me/vkambulov',

  /** Текст кнопки Telegram */
  telegramLabel: 'Telegram',
} as const

// ─── Ссылки ──────────────────────────────────────────────────
export const links = {
  /** URL репозитория на GitHub */
  github: 'https://github.com/vkambulov/vk09-maintenance',
} as const

// ─── Общие настройки ─────────────────────────────────────────
export const maintenance = {
  /** Заголовок страницы (первая строка) */
  headingLine1: 'Обновление',

  /** Заголовок страницы (вторая строка) */
  headingLine2: 'сайта',

  /** Описание под заголовком */
  description:
    'Работаю над новой версией сайта. Обновляю дизайн, улучшаю производительность и добавляю новые функции.',

  /** Текст в футере */
  footer: '© 2026 VKambulov. Все системы в норме.',
} as const
