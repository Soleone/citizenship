/**
 * Sound and confetti. Both are synthesized on the spot, so there are no assets
 * to load, and both respect the learner: sound has a mute switch, confetti
 * stays off for anyone who asked the system for reduced motion.
 */

let audio: AudioContext | null = null;
let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.12,
) {
  if (!audio) return;
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0, audio.currentTime + start);
  amp.gain.linearRampToValueAtTime(gain, audio.currentTime + start + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(amp).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.05);
}

const SOUNDS = {
  correct: () => {
    tone(660, 0, 0.12, "triangle");
    tone(990, 0.07, 0.18, "triangle");
  },
  wrong: () => {
    tone(220, 0, 0.18, "sawtooth", 0.05);
    tone(180, 0.1, 0.22, "sawtooth", 0.05);
  },
  win: () =>
    [523, 659, 784, 1047].forEach((freq, index) => tone(freq, index * 0.09, 0.25, "triangle")),
  tick: () => tone(1200, 0, 0.04, "square", 0.03),
};

export type SoundName = keyof typeof SOUNDS;

export function play(name: SoundName) {
  if (muted || typeof window === "undefined") return;
  audio ??= new AudioContext();
  if (audio.state === "suspended") void audio.resume();
  SOUNDS[name]();
}

const COLORS = ["#e46a52", "#f0b84b", "#9ed8d4", "#3d8d72", "#d52b1e", "#ffffff"];

export function confetti(pieces = 140) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.append(canvas);
  const context = canvas.getContext("2d");
  if (!context) return canvas.remove();

  const bits = Array.from({ length: pieces }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.3,
    y: canvas.height * 0.35,
    vx: (Math.random() - 0.5) * 16,
    vy: -Math.random() * 14 - 4,
    size: 5 + Math.random() * 7,
    spin: Math.random() * Math.PI,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    leaf: Math.random() < 0.25,
  }));

  const started = performance.now();
  const frame = (time: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const bit of bits) {
      bit.vy += 0.35;
      bit.vx *= 0.99;
      bit.x += bit.vx;
      bit.y += bit.vy;
      bit.spin += 0.15;
      context.save();
      context.translate(bit.x, bit.y);
      context.rotate(bit.spin);
      context.fillStyle = bit.color;
      if (bit.leaf) {
        context.font = `${bit.size * 2.4}px serif`;
        context.fillText("🍁", 0, 0);
      } else {
        context.fillRect(-bit.size / 2, -bit.size / 4, bit.size, bit.size / 2);
      }
      context.restore();
    }
    if (time - started < 2600) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
