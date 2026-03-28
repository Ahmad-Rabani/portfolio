/**
 * Professional UI Click Sound Generator
 * Generates a subtle, minimal click sound using Web Audio API
 */

const audioContext = typeof window !== 'undefined' 
  ? new (window.AudioContext || (window as any).webkitAudioContext)()
  : null;

/**
 * Play a professional UI click sound
 * Duration: 80ms, clean digital tone, minimal volume
 */
export const playClickSound = (volume: number = 0.15): void => {
  if (!audioContext || audioContext.state === 'interrupted') return;

  try {
    const now = audioContext.currentTime;
    const duration = 0.08; // 80ms

    // Create oscillator for the click tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Create a biquad filter for a subtle high-pass effect
    const filter = audioContext.createBiquadFilter();

    // Configure oscillator - start high and drop quickly for a "tap" effect
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + duration);

    // Configure filter
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, now);

    // Configure gain - quick attack, quick decay
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.005); // 5ms attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // decay

    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Play sound
    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (error) {
    console.error('Error playing click sound:', error);
  }
};

/**
 * Play a success sound (higher pitch, slightly longer)
 * Used for form submission success
 */
export const playSuccessSound = (volume: number = 0.12): void => {
  if (!audioContext || audioContext.state === 'interrupted') return;

  try {
    const now = audioContext.currentTime;
    const duration = 0.12; // 120ms

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Two-note ascending tone for success feedback
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.setValueAtTime(900, now + duration * 0.5);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1500, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.008);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (error) {
    console.error('Error playing success sound:', error);
  }
};
