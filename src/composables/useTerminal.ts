import { nextTick, ref } from 'vue'
import { release, stack as stackConfig } from '../config/maintenance.config'
import { useEasterEggTracker } from './useEasterEggs'
import { useMaintenanceProgress } from './useMaintenanceProgress'

export interface TerminalCommand {
  desc: string
  hidden?: boolean
  execute: () => string | null
}

export function useTerminal() {
  const progress = useMaintenanceProgress()
  const tracker = useEasterEggTracker()

  const lines = ref<string[]>([
    '> initializing system_check...',
    '> loading assets... <span class="text-[#ff8c00]">done</span>',
    '> connection: <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-900 inline-block"></span> secure</span>',
  ])

  const terminalOutputRef = ref<HTMLElement | null>(null)
  let secretUnlocked = false
  /** Блокировка ввода на время анимации coffee */
  const inputLocked = ref(false)

  /** Строка прогресса пасхалок: ██░░ 2/3 */
  function easterEggProgressLine(): string {
    const found = tracker.foundCount()
    const total = tracker.total
    const filled = '█'.repeat(found)
    const empty = '░'.repeat(total - found)
    const color = found === total ? 'text-green-500' : 'text-yellow-500'
    const label =
      found === total
        ? '🏆 Все пасхалки найдены!'
        : `Продолжайте исследовать...`
    return `<span class="${color}">⭐ Пасхалки: [${filled}${empty}] ${found}/${total}</span>\n  <span class="text-[#666]">${label}</span>`
  }

  const commands: Record<string, TerminalCommand> = {
    help: {
      desc: 'Показать список доступных команд',
      execute: () => {
        return `<span class="text-[#ff8c00]">Available commands:</span>\n  <span class="text-[#ccc]">help</span>      - Список команд\n  <span class="text-[#ccc]">status</span>    - Текущий статус системы\n  <span class="text-[#ccc]">version</span>   - Версия системы\n  <span class="text-[#ccc]">stack</span>     - Технологический стек\n  <span class="text-[#ccc]">uptime</span>    - Время работы\n  <span class="text-[#ccc]">clear</span>     - Очистить терминал`
      },
    },
    status: {
      desc: 'Показать текущий статус системы',
      execute: () => {
        return `<span class="text-[#ff8c00]">System Status:</span>\n  Build Progress: ${progress.percent}%\n  Current Task: ${progress.label}\n  Remaining Time: ${progress.estTime}\n  Packets: ${progress.packets}\n  <span class="text-green-500">Status: RUNNING</span>`
      },
    },
    version: {
      desc: 'Показать версию системы',
      execute: () => {
        return `<span class="text-[#ff8c00]">System Version:</span>\n  Build: ${release.build}\n  Node.js: ${release.node}\n  Framework: ${release.framework}\n  Content: ${release.content}`
      },
    },
    stack: {
      desc: 'Показать технологический стек',
      execute: () => {
        return `<span class="text-[#ff8c00]">Technology Stack:</span>\n  Runtime: ${stackConfig.runtime}\n  Framework: ${stackConfig.framework}\n  Content: ${stackConfig.content}\n  Deploy: ${stackConfig.deploy}`
      },
    },
    uptime: {
      desc: 'Показать время работы',
      execute: () => {
        const uptime = Math.floor(Math.random() * 1000) + 500
        return `<span class="text-[#ff8c00]">System Uptime:</span>\n  Maintenance started: ${uptime} seconds ago\n  Expected completion: 2700 seconds`
      },
    },
    clear: {
      desc: 'Очистить терминал',
      execute: () => {
        lines.value = ['> terminal cleared']
        return null
      },
    },
    secret: {
      desc: 'Секретная команда',
      hidden: true,
      execute: () => {
        return `<span class="text-[#ff8c00]">    _____ _____ _____ _____ _____ _____ \n   / ____|  ___/ ____|  _  \\  ___|_   _|\n  | (___ | |__ | |    | |_| | |__   | |  \n   \\___ \\|  __|| |    |  _  |  __|  | |  \n   ____) | |___| |____| | | | |___  | |  \n  |_____/|______\\_____|_| |_|_____| |_|  </span>\n\n  <span class="text-green-500">🔓 ACCESS GRANTED 🔓</span>\n\n  <span class="text-[#ccc]">«Сначала реши проблему. Потом пиши код.»</span>\n  <span class="text-[#666]">— John Johnson</span>\n\n  <span class="text-[#ff8c00]">Developer level: </span><span class="text-green-500">███████████</span><span class="text-[#333]">█████</span> <span class="text-[#999]">70%</span>\n\n  ${easterEggProgressLine()}`
      },
    },
    coffee: {
      desc: 'Сварить кофе',
      hidden: true,
      execute: () => {
        // Запускаем анимированный прогресс варки кофе
        animateCoffeeBrew()
        return null // вывод управляется через animateCoffeeBrew
      },
    },
    matrix: {
      desc: 'Войти в матрицу',
      hidden: true,
      execute: () => {
        const chars = ['ア', 'イ', 'ウ', 'エ', 'オ', '1', '0', 'カ', 'キ']
        let matrix = ''
        for (let i = 0; i < 5; i++) {
          let line = ''
          for (let j = 0; j < 30; j++) {
            line += chars[Math.floor(Math.random() * chars.length)]
          }
          matrix += `<span class="text-green-500">${line}</span>\n`
        }
        return matrix + '<span class="text-[#ff8c00]">Wake up, Neo...</span>'
      },
    },
  }

  /** Анимация варки кофе — прогресс-бар заполняется постепенно */
  function animateCoffeeBrew() {
    inputLocked.value = true
    addLog('<span class="text-[#ff8c00]">☕ Brewing coffee...</span>')

    const totalSteps = 20
    const barFill = '█'
    const barEmpty = '░'
    const intervalMs = 150 // 150ms × 20 шагов = 3 секунды

    // Добавляем начальный прогресс-бар
    const barLineIndex = lines.value.length
    lines.value.push(`  [${barEmpty.repeat(totalSteps)}] 0%`)

    let step = 0

    const timer = setInterval(() => {
      step++
      const percent = Math.round((step / totalSteps) * 100)
      const filled = barFill.repeat(step)
      const empty = barEmpty.repeat(totalSteps - step)
      lines.value[barLineIndex] = `  [<span class="text-[#ff8c00]">${filled}</span>${empty}] ${percent}%`

      // Прокручиваем к низу на каждом шаге
      nextTick(() => {
        if (terminalOutputRef.value) {
          terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight
        }
      })

      if (step >= totalSteps) {
        clearInterval(timer)
        addLog('  <span class="text-green-500">Coffee ready! ☕</span>')
        addLog('  <span class="text-[#666]">Warning: Coffee may contain bugs 🐛</span>')
        inputLocked.value = false
      }
    }, intervalMs)
  }

  function addLog(message: string, isCommand = false) {
    const formatted = isCommand
      ? `<span class="text-[#ff8c00]">&gt;</span> ${message}`
      : message
    lines.value.push(formatted)
    nextTick(() => {
      if (terminalOutputRef.value) {
        terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight
      }
    })
  }

  function executeCommand(input: string) {
    if (inputLocked.value) return

    const command = input.trim().toLowerCase()
    if (!command) return

    addLog(command, true)

    const cmd = commands[command]
    if (cmd) {
      const result = cmd.execute()
      if (result !== null) {
        addLog(result)
      }
    } else {
      addLog(
        `<span class="text-red-400">Error:</span> command '${command}' not found. Type 'help' for available commands.`
      )
    }
  }

  function unlockSecret() {
    if (secretUnlocked) return
    secretUnlocked = true
    commands.secret!.hidden = false

    tracker.markFound(3)

    addLog('<span class="text-[#ff8c00]">🎮 KONAMI CODE DETECTED!</span>')
    addLog('<span class="text-green-500">🔓 Пасхалка #3 разблокирована!</span>')
    addLog(easterEggProgressLine())
    addLog(
      '<span class="text-yellow-500">Secret command "secret" is now available!</span>'
    )
    addLog(
      '<span class="text-[#666]">Type "secret" to access hidden features...</span>'
    )
  }

  // Auto logs — разнообразные сообщения сборки
  const autoLogs = [
    // Сборка и компиляция
    '> compiling TypeScript sources...',
    '> building production bundle...',
    '> transpiling ES modules...',
    '> bundling vendor chunks...',
    '> generating source maps...',
    '> minifying JavaScript...',
    '> minifying CSS assets...',
    '> tree-shaking unused exports...',
    '> code-splitting route chunks...',
    '> compiling SCSS modules...',

    // Оптимизация
    '> optimizing images...',
    '> compressing static assets...',
    '> inlining critical CSS...',
    '> prefetching route data...',
    '> optimizing SVG sprites...',
    '> lazy-loading offscreen images...',
    '> purging unused CSS selectors...',

    // Проверки и анализ
    '> verifying checksums...',
    '> analyzing dependencies...',
    '> running lint checks...',
    '> validating schema definitions...',
    '> checking circular imports...',
    '> auditing npm packages...',
    '> scanning for vulnerabilities...',
    '> type-checking components...',

    // Генерация и SSR
    '> pre-rendering static pages...',
    '> generating sitemap.xml...',
    '> building RSS feed...',
    '> hydrating server components...',
    '> generating robots.txt...',
    '> rendering Open Graph images...',
    '> generating favicon set...',

    // Кэш и данные
    '> warming up cache...',
    '> invalidating stale cache...',
    '> indexing search data...',
    '> compiling markdown content...',
    '> syncing asset manifest...',
    '> hashing static filenames...',

    // Инфраструктура
    '> configuring service worker...',
    '> registering API routes...',
    '> initializing edge functions...',
    '> deploying CDN rules...',
    '> setting up redirects...',
    '> compressing gzip bundles...',
    '> generating brotli archives...',

    // Тестирование
    '> running unit tests...',
    '> snapshot testing components...',
    '> measuring Lighthouse score...',
    '> checking accessibility (a11y)...',
    '> validating HTML output...',
    '> profiling runtime performance...',
  ]

  /** Перемешивание массива (Fisher-Yates) */
  function shuffleArray(arr: string[]): string[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = a[i]!
      a[i] = a[j]!
      a[j] = tmp
    }
    return a
  }

  let shuffledLogs = shuffleArray(autoLogs)
  let logIndex = 0

  function startAutoLogs() {
    setInterval(() => {
      // Когда дошли до конца — перемешиваем заново
      if (logIndex >= shuffledLogs.length) {
        shuffledLogs = shuffleArray(autoLogs)
        logIndex = 0
      }
      const log = shuffledLogs[logIndex++]
      addLog(log + ' <span class="text-[#666]">done</span>')
    }, 5000)
  }

  return {
    lines,
    terminalOutputRef,
    inputLocked,
    addLog,
    executeCommand,
    unlockSecret,
    startAutoLogs,
    tracker,
    easterEggProgressLine,
  }
}
