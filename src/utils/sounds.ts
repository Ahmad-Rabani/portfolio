/**
 * Professional UI Click Sound Generator
 * Generates a subtle, minimal click sound using Web Audio API
 */

type WebkitWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (audioContext) {
    return audioContext;
  }

  const AudioContextClass = window.AudioContext || (window as WebkitWindow).webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  audioContext = new AudioContextClass();
  return audioContext;
};

const runWhenAudioReady = (callback: (ctx: AudioContext) => void): void => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'closed' || ctx.state === 'interrupted') {
    return;
  }

  if (ctx.state === 'suspended') {
    void ctx.resume().then(() => callback(ctx)).catch(() => undefined);
    return;
  }

  callback(ctx);
};

export const primeClickSound = (): void => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'suspended') {
    return;
  }

  void ctx.resume().catch(() => undefined);
};

/**
 * Play a professional UI click sound
 * Duration: 80ms, clean digital tone, minimal volume
 */
export const playClickSound = (volume: number = 0.15): void => {
  runWhenAudioReady((ctx) => {
    const now = ctx.currentTime + 0.001;
    const duration = 0.05;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(760, now);
    oscillator.frequency.exponentialRampToValueAtTime(260, now + duration);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(volume, 0.001), now + 0.004);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  });
};

/**
 * Play a success sound (higher pitch, slightly longer)
 * Used for form submission success
 */
export const playSuccessSound = (volume: number = 0.12): void => {
  runWhenAudioReady((ctx) => {
    const now = ctx.currentTime + 0.001;
    const duration = 0.11;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(560, now);
    oscillator.frequency.linearRampToValueAtTime(920, now + duration * 0.55);
    oscillator.frequency.linearRampToValueAtTime(1160, now + duration);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(volume, 0.001), now + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  });
};
