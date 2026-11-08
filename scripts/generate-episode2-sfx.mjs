import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

const sampleRate = 44100;
const outputDir = 'public/audio/002-kulkas/sfx';

let seed = 20261108;
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0xffffffff;
};

const writeWav = (name, durationSeconds, makeSample) => {
  const samples = Math.floor(sampleRate * durationSeconds);
  const pcm = Buffer.alloc(samples * 2);

  for (let i = 0; i < samples; i += 1) {
    const t = i / sampleRate;
    const value = Math.max(-1, Math.min(1, makeSample(t, i, samples)));
    pcm.writeInt16LE(Math.round(value * 32767), i * 2);
  }

  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);

  const output = `${outputDir}/${name}.wav`;
  mkdirSync(dirname(output), {recursive: true});
  writeFileSync(output, Buffer.concat([header, pcm]));
  console.log(`Generated ${output}`);
};

writeWav('footstep', 0.22, (t) => {
  const thump = Math.sin(2 * Math.PI * (92 - 35 * t) * t) * Math.exp(-t * 24) * 0.72;
  const tap = (random() * 2 - 1) * Math.exp(-t * 48) * 0.13;
  return thump + tap;
});

writeWav('fridge-click', 0.16, (t) => {
  const clickA = (random() * 2 - 1) * Math.exp(-t * 95) * 0.8;
  const t2 = Math.max(0, t - 0.052);
  const clickB = t > 0.052 ? (random() * 2 - 1) * Math.exp(-t2 * 105) * 0.42 : 0;
  return clickA + clickB;
});

writeWav('fridge-hum', 8, (t) => {
  const fadeIn = Math.min(1, t / 0.15);
  const fadeOut = Math.min(1, (8 - t) / 0.18);
  const env = Math.max(0, Math.min(fadeIn, fadeOut));
  const hum =
    Math.sin(2 * Math.PI * 56 * t) * 0.08 +
    Math.sin(2 * Math.PI * 112 * t) * 0.023 +
    Math.sin(2 * Math.PI * 168 * t) * 0.012;
  const air = (random() * 2 - 1) * 0.006;
  return (hum + air) * env;
});

writeWav('detective-sting', 0.95, (t) => {
  const env = Math.exp(-t * 3.4);
  const freq = 520 - 265 * Math.min(1, t / 0.7);
  const tone = Math.sin(2 * Math.PI * freq * t) * env * 0.34;
  const low = Math.sin(2 * Math.PI * 72 * t) * Math.exp(-t * 5.5) * 0.24;
  const tick = t < 0.05 ? (random() * 2 - 1) * Math.exp(-t * 80) * 0.28 : 0;
  return tone + low + tick;
});

writeWav('time-skip', 0.85, (t) => {
  const freq = 220 + 880 * Math.min(1, t / 0.7);
  const sweep = Math.sin(2 * Math.PI * freq * t) * Math.sin(Math.PI * Math.min(1, t / 0.85)) * 0.18;
  const tickIndex = Math.floor(t / 0.14);
  const local = t - tickIndex * 0.14;
  const ticks = local < 0.026 ? (random() * 2 - 1) * Math.exp(-local * 90) * 0.18 : 0;
  return sweep + ticks;
});

writeWav('tiny-fail', 0.62, (t) => {
  const freq = 460 - 300 * Math.min(1, t / 0.55);
  const tone = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 4.6) * 0.28;
  const plop = Math.sin(2 * Math.PI * 92 * t) * Math.exp(-t * 9.5) * 0.14;
  return tone + plop;
});
