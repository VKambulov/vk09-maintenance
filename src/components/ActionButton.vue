<script setup lang="ts">
defineProps<{
  href: string
  variant: 'primary' | 'secondary'
}>()
</script>

<template>
  <a
    :href="href"
    :class="[
      'inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-lg transition-all gap-2',
      variant === 'primary'
        ? 'bg-white text-black hover:bg-[#DDD]'
        : 'bg-[#252525] text-white border border-[#3a3a3a] hover:bg-[#303030] hover:border-[#454545] font-medium',
    ]"
  >
    <slot />
  </a>
</template>
