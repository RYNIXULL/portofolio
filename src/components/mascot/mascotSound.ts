/**
 * Synth Audio Service for Jean Mascot
 * Uses the Web Audio API to synthesize cute futuristic robot sound effects.
 * Lightweight, zero-dependency, and works offline.
 */
export class MascotSound {
  private static ctx: AudioContext | null = null

  private static init() {
    if (this.ctx) return
    if (typeof window === 'undefined') return

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (AudioContextClass) {
      this.ctx = new AudioContextClass()
    }
  }

  /**
   * Play synthesized sound effect
   */
  static play(type: 'click' | 'happy' | 'sleep' | 'typing' | 'blush' | 'angry') {
    try {
      this.init()
      if (!this.ctx) return

      // Resume context if suspended (browser auto-play security policy)
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      const now = this.ctx.currentTime

      if (type === 'click') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, now)
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08)
        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === 'happy') {
        // Futuristic double beep (beep-boop!)
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(523.25, now) // C5
        osc.frequency.setValueAtTime(783.99, now + 0.08) // G5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.2) // C6
        
        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
        osc.start(now)
        osc.stop(now + 0.22)
      } else if (type === 'typing') {
        // Very soft short tick
        osc.type = 'sine'
        osc.frequency.setValueAtTime(900 + Math.random() * 300, now)
        gain.gain.setValueAtTime(0.015, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
        osc.start(now)
        osc.stop(now + 0.03)
      } else if (type === 'sleep') {
        // Descending low-frequency hum
        osc.type = 'sine'
        osc.frequency.setValueAtTime(180, now)
        osc.frequency.linearRampToValueAtTime(90, now + 0.4)
        gain.gain.setValueAtTime(0.03, now)
        gain.gain.linearRampToValueAtTime(0.001, now + 0.4)
        osc.start(now)
        osc.stop(now + 0.4)
      } else if (type === 'blush') {
        // Cute upward sweep with soft vibrato feel
        osc.type = 'sine'
        osc.frequency.setValueAtTime(450, now)
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.25)
        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
        osc.start(now)
        osc.stop(now + 0.25)
      } else if (type === 'angry') {
        // Harsh sawtooth low buzz descending
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(200, now)
        osc.frequency.linearRampToValueAtTime(70, now + 0.3)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3)
        osc.start(now)
        osc.stop(now + 0.3)
      }
    } catch (e) {
      console.warn('Audio Context is not supported or was blocked:', e)
    }
  }
}
