<script setup lang="ts">
defineProps<{
  processName: string
  label: string
  percent: number
  estTime: string
  packets: string
}>()
</script>

<template>
  <div class="mt-12 mb-12">
    <div class="flex justify-between items-end mb-3">
      <div class="flex flex-col">
        <span class="text-xs font-mono text-[#777] uppercase mb-1">{{ processName }}</span>
        <span class="text-sm text-white font-medium">{{ label }}</span>
      </div>
      <span class="font-mono text-[#ff8c00] text-lg">{{ percent }}%</span>
    </div>

    <div class="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
      <div
        class="h-full bg-[#ff8c00] relative rounded-full transition-all duration-500"
        :style="{ width: percent + '%' }"
      >
        <div class="absolute inset-0 progress-bar-stripe opacity-30" />
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </div>
    </div>

    <div class="mt-4 flex items-center gap-4 text-xs font-mono text-[#555]">
      <span>EST. TIME: {{ estTime }}</span>
      <span>•</span>
      <span>PACKETS: {{ packets }}</span>
    </div>
  </div>
</template>
