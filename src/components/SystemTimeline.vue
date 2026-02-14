<script setup lang="ts">
import { timelineSteps } from '../config/maintenance.config';
import TimelineItem from './TimelineItem.vue';
</script>

<template>
  <div class="flex flex-col gap-6 relative">
    <!-- Vertical line -->
    <div class="absolute left-[9px] top-2 bottom-2 w-[1px] bg-[#2a2a2a] z-0" />

    <TimelineItem
      v-for="(step, index) in timelineSteps"
      :key="index"
      :title="step.title"
      :subtitle="step.subtitle"
      :status="step.status"
      :detail="step.detail"
      :detail-secondary="step.detailSecondary"
    />
  </div>
</template>
