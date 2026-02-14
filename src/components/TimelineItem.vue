<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  status: 'completed' | 'active' | 'pending'
  detail?: string
  detailSecondary?: string
}>()
</script>

<template>
  <div
    class="flex gap-4 items-start relative z-10"
    :class="{ 'opacity-50': status === 'completed' }"
  >
    <!-- Dot -->
    <div
      v-if="status === 'completed'"
      class="w-5 h-5 rounded-full bg-[#0f0f0f] border border-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5"
    >
      <svg class="w-3 h-3 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <div
      v-else-if="status === 'active'"
      class="w-5 h-5 rounded-full bg-[#ff8c00] border-2 border-[#1f1f1f] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(255,140,0,0.5)]"
    >
      <div class="w-2 h-2 rounded-full border border-white border-t-transparent animate-spin" />
    </div>

    <div
      v-else
      class="w-5 h-5 rounded-full bg-[#0f0f0f] border border-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5"
    />

    <!-- Content -->
    <div>
      <h4
        :class="[
          'text-sm font-medium',
          status === 'completed'
            ? 'text-[#aaa] line-through decoration-[#555]'
            : status === 'active'
              ? 'text-white'
              : 'text-[#777]',
        ]"
      >
        {{ title }}
      </h4>

      <template v-if="status === 'active' && (detail || detailSecondary)">
        <div class="flex flex-col gap-1 mt-1">
          <span v-if="detail" class="text-[10px] font-mono text-[#ff8c00]">{{ detail }}</span>
          <span v-if="detailSecondary" class="text-[10px] font-mono text-[#555]">{{
            detailSecondary
          }}</span>
        </div>
      </template>

      <span v-else class="text-[10px] font-mono text-[#666]" :class="{ 'text-[#555]': status === 'pending' }">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>
