<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  lines: string[]
  inputLocked?: boolean
}>()

const emit = defineEmits<{
  command: [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const outputRef = ref<HTMLElement | null>(null)
const inputValue = ref('')

function handleSubmit() {
  if (props.inputLocked) return
  if (inputValue.value.trim()) {
    emit('command', inputValue.value)
    inputValue.value = ''
  }
}

function focusInput() {
  inputRef.value?.focus()
}

watch(
  () => props.lines.length,
  () => {
    nextTick(() => {
      if (outputRef.value) {
        outputRef.value.scrollTop = outputRef.value.scrollHeight
      }
    })
  }
)

onMounted(() => {
  nextTick(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight
    }
  })
})

defineExpose({ outputRef })
</script>

<template>
  <div
    class="p-4 bg-[#0f0f0f] border-t border-[#2a2a2a] font-mono text-[10px] text-[#555] leading-relaxed flex flex-col"
  >
    <div
      ref="outputRef"
      class="flex-1 overflow-y-auto mb-2 space-y-1 cursor-text"
      @click="focusInput"
    >
      <p
        v-for="(line, index) in lines"
        :key="index"
        style="white-space: pre-wrap"
        v-html="line"
      />
    </div>
    <div class="flex items-center gap-2 border-t border-[#2a2a2a] pt-2">
      <span class="text-[#ff8c00]">&gt;</span>
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="flex-1 bg-transparent border-none outline-none font-mono text-[10px]"
        :class="inputLocked ? 'text-[#555] cursor-not-allowed' : 'text-[#ddd]'"
        :placeholder="inputLocked ? 'Processing...' : 'Type help for available commands'"
        :disabled="inputLocked"
        autocomplete="off"
        @keydown.enter="handleSubmit"
      />
    </div>
  </div>
</template>
