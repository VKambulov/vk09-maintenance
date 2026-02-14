<script setup lang="ts">
import { release } from '../config/maintenance.config';
import SystemTimeline from './SystemTimeline.vue';
import TerminalPanel from './TerminalPanel.vue';

defineProps<{
  lines: string[]
  inputLocked: boolean
}>()

const emit = defineEmits<{
  command: [value: string]
}>()
</script>

<template>
  <div
    class="w-full lg:w-[420px] bg-[#1f1f1f] border-t lg:border-t-0 lg:border-l border-[#2a2a2a] relative flex flex-col shrink-0"
    style="overflow: hidden"
  >
    <!-- Header -->
    <div class="p-6 border-b border-[#2a2a2a] bg-[#1f1f1f] z-10">
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs font-mono text-[#777] uppercase">System Monitor</span>
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span class="text-xs font-mono text-amber-400 uppercase">разработка</span>
        </div>
      </div>
      <div class="text-sm text-[#ddd] font-mono">Build {{ release.build }}</div>
    </div>

    <!-- Timeline (scan-line is contained here) -->
    <div class="overflow-hidden px-6 py-6 relative z-10 shrink-0">
      <div class="scan-line" />
      <SystemTimeline />
    </div>

    <!-- Terminal -->
    <TerminalPanel :lines="lines" :input-locked="inputLocked" class="terminal-wrapper" @command="(v) => emit('command', v)" />
  </div>
</template>
