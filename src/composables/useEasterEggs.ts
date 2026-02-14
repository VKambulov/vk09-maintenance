import { onMounted, onUnmounted, reactive, ref } from 'vue'

// ─── Глобальный трекер пасхалок ──────────────────────────────
const easterEggState = reactive({
  found: new Set<number>(),
})

export function useEasterEggTracker() {
  function markFound(id: number) {
    easterEggState.found.add(id)
  }

  function isFound(id: number): boolean {
    return easterEggState.found.has(id)
  }

  function foundCount(): number {
    return easterEggState.found.size
  }

  const total = 3

  return { markFound, isFound, foundCount, total }
}

// ─── Konami Code ─────────────────────────────────────────────
export function useKonamiCode(onActivate: () => void) {
  const secretCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
  ]
  let keySequence: string[] = []
  let activated = false

  function handleKeydown(e: KeyboardEvent) {
    // Ignore if focus is on an input
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return

    keySequence.push(e.key)

    if (keySequence.length > secretCode.length) {
      keySequence.shift()
    }

    if (
      keySequence.length === secretCode.length &&
      keySequence.every((key, index) => key === secretCode[index])
    ) {
      if (!activated) {
        activated = true
        onActivate()
        showKonamiOverlay()
        keySequence = []
      }
    }
  }

  function showKonamiOverlay() {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle, rgba(255,140,0,0.3) 0%, transparent 70%);
      z-index: 9998;
      pointer-events: none;
      animation: pulse-overlay 1s ease-out forwards;
    `
    document.body.appendChild(overlay)
    setTimeout(() => overlay.remove(), 1000)
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}

export function useDotClicker(onTripleClick: () => void) {
  const clicks = ref(0)

  function handleClick() {
    clicks.value++
    if (clicks.value === 3) {
      document.body.style.animation = 'glitch 0.3s ease'
      setTimeout(() => {
        document.body.style.animation = ''
      }, 300)
      onTripleClick()
      clicks.value = 0
    }
  }

  return { handleClick }
}

export function usePeriodClicker(onComplete: () => void) {
  const clicks = ref(0)
  const colors = ['#333', '#ff8c00', '#00ff00', '#0088ff', '#ff00ff']
  const currentColor = ref(colors[0])

  function handleClick() {
    clicks.value++
    currentColor.value = colors[clicks.value % colors.length]

    if (clicks.value === 5) {
      createMatrixRain()
      onComplete()
      clicks.value = 0
      currentColor.value = '#333'
    }
  }

  return { handleClick, currentColor }
}

function createMatrixRain() {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')!
  const chars = 'アイウエオカキクケコ01'.split('')
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)

  let frameCount = 0
  const maxFrames = 100

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0F0'
    ctx.font = fontSize + 'px monospace'

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]!
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }

    frameCount++
    if (frameCount < maxFrames) {
      requestAnimationFrame(draw)
    } else {
      setTimeout(() => {
        canvas.style.opacity = '0'
        canvas.style.transition = 'opacity 1s'
        setTimeout(() => canvas.remove(), 1000)
      }, 500)
    }
  }

  draw()
}
