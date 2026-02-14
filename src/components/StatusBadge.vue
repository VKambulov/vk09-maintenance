<script setup lang="ts">
defineProps<{
  label: string
}>()

const emit = defineEmits<{
  dotClick: []
}>()
</script>

<template>
  <div class="flex items-center gap-3 mb-8 group">
    <div
      class="h-3 w-3 rounded-full bg-[#ff8c00] status-dot cursor-pointer hover:scale-125 transition-transform"
      @click="emit('dotClick')"
    />
    <span class="font-mono text-xs text-[#ff8c00] uppercase tracking-widest">
      {{ label }}
    </span>
  </div>
</template>
