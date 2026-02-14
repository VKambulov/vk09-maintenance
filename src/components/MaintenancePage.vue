<script setup lang="ts">
import { onMounted } from 'vue'
import { useDotClicker, useEasterEggTracker, useKonamiCode, usePeriodClicker } from '../composables/useEasterEggs'
import { useMaintenanceProgress } from '../composables/useMaintenanceProgress'
import { useTerminal } from '../composables/useTerminal'
import { contacts, links, maintenance } from '../config/maintenance.config'
import ActionButton from './ActionButton.vue'
import ProgressBar from './ProgressBar.vue'
import StatusBadge from './StatusBadge.vue'
import SystemMonitor from './SystemMonitor.vue'
import EmailIcon from './icons/EmailIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'
import TelegramIcon from './icons/TelegramIcon.vue'

const { lines, inputLocked, addLog, executeCommand, unlockSecret, startAutoLogs, easterEggProgressLine } = useTerminal()
const progress = useMaintenanceProgress()
const tracker = useEasterEggTracker()

// Easter egg: triple click on status dot
const { handleClick: handleDotClick } = useDotClicker(() => {
  if (!tracker.isFound(1)) {
    tracker.markFound(1)
    addLog('<span class="text-[#ff8c00]">⚠️ SYSTEM ALERT: Anomaly detected!</span>')
    addLog(
      '<span class="text-green-500">Пасхалка #1 найдена! Попробуйте ввести "matrix" в терминале...</span>'
    )
    addLog(easterEggProgressLine())
  } else {
    addLog('<span class="text-[#666]">⚠️ Anomaly уже была обнаружена ранее.</span>')
  }
})

// Easter egg: 5 clicks on the period
const { handleClick: handlePeriodClick, currentColor: periodColor } = usePeriodClicker(() => {
  if (!tracker.isFound(2)) {
    tracker.markFound(2)
    addLog('<span class="text-[#ff8c00]">🌈 COLOR SEQUENCE COMPLETED!</span>')
    addLog(
      '<span class="text-green-500">Пасхалка #2 найдена! Вы нашли радужную точку!</span>'
    )
    addLog(easterEggProgressLine())
    addLog('<span class="text-[#666]">Hint: try the "coffee" command when you need energy ☕</span>')
  } else {
    addLog('<span class="text-[#666]">🌈 Радужная точка уже найдена!</span>')
  }
})

// Easter egg: Konami code
useKonamiCode(() => {
  unlockSecret()
})

// DevTools console easter egg
onMounted(() => {
  startAutoLogs()

  console.log(
    '%c🔍 DEVELOPER MODE DETECTED',
    'color: #ff8c00; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
  )
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;')
  console.log('%cWelcome, curious developer! 👾', 'color: #fff; font-size: 14px;')
  console.log("%cYou've found the first clue...", 'color: #999; font-style: italic;')
  console.log('')
  console.log('%c💡 HINT:', 'color: #00ff00; font-weight: bold;')
  console.log(
    '%cTry the legendary %cKONAMI CODE%c on this page:',
    'color: #ccc;',
    'color: #ff8c00; font-weight: bold;',
    'color: #ccc;'
  )
  console.log(
    '%c   ↑ ↑ ↓ ↓ ← → ← →',
    'color: #ff8c00; font-family: monospace; font-size: 16px; font-weight: bold;'
  )
  console.log('')
  console.log(
    '%c🎮 This will unlock a secret terminal command...',
    'color: #666; font-style: italic;'
  )
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #666;')
  console.log('')
  console.log(
    '%cP.S. There are more easter eggs hidden on this page. Keep exploring! 🕵️',
    'color: #555; font-size: 11px;'
  )
})
</script>

<template>
  <div class="min-h-screen w-full flex items-start lg:items-center justify-center relative overflow-x-hidden">
    <!-- Grid background -->
    <div class="fixed inset-0 grid-bg z-0 pointer-events-none" />

    <!-- Main container -->
    <div class="relative z-10 w-full max-w-6xl p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center lg:h-full">
      <div
        class="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-full lg:h-[700px]"
      >
        <!-- Left panel: Content -->
        <div class="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-between relative bg-[#1a1a1a] overflow-y-auto">
          <div>
            <StatusBadge label="Режим обслуживания" @dot-click="handleDotClick" />

            <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {{ maintenance.headingLine1 }} <br />
              <span class="text-[#888]">
                {{ maintenance.headingLine2 }}
                <span
                  class="text-base ml-2 inline-block cursor-pointer hover:opacity-80 transition-colors select-none"
                  :style="{ color: periodColor }"
                  @click="handlePeriodClick"
                >.</span>
              </span>
            </h1>

            <p class="text-[#999] text-base lg:text-lg max-w-md leading-relaxed">
              {{ maintenance.description }}
            </p>
          </div>

          <ProgressBar
            :process-name="progress.processName"
            :label="progress.label"
            :percent="progress.percent"
            :est-time="progress.estTime"
            :packets="progress.packets"
          />

          <div class="flex flex-col sm:flex-row gap-4 mt-auto">
            <ActionButton :href="contacts.email" variant="primary">
              <EmailIcon />
              {{ contacts.emailLabel }}
            </ActionButton>
            <ActionButton :href="contacts.telegram" variant="secondary">
              <TelegramIcon />
              {{ contacts.telegramLabel }}
            </ActionButton>
          </div>
        </div>

        <!-- Right panel: System Monitor -->
        <SystemMonitor :lines="lines" :input-locked="inputLocked" @command="executeCommand" />
      </div>

      <!-- Footer -->
      <div
        class="mt-4 pb-4 px-4 lg:mt-6 lg:pb-0 w-full font-mono text-[10px] text-[#444] uppercase tracking-widest shrink-0 flex items-center justify-between"
      >
        <span
          class="cursor-help group"
          title="💡 Подсказка: откройте DevTools (F12)"
        >
          {{ maintenance.footer }}
          <span class="text-[#666] opacity-0 group-hover:opacity-100 transition-opacity ml-2">🔍</span>
        </span>
        <a
          :href="links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center w-6 h-6 rounded-md text-[#555] hover:text-white hover:bg-[#2a2a2a] transition-all duration-200"
          title="GitHub"
        >
          <GithubIcon />
        </a>
      </div>
    </div>
  </div>
</template>
