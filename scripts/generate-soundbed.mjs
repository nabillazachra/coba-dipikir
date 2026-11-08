import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';

const sampleRate = 44100;
const durationSeconds = 36;
const samples = sampleRate * durationSeconds;
const data = new Float32Array(samples);

let seed = 1337;
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0xffffffff;
};

const addKick = (time, level = 0.16) => {
  const start = Math.floor(time * sampleRate);
  const len = Math.floor(0.18 * sampleRate);
  for (let i = 0; i < len && start + i < samples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 24);
    const freq = 90 - 42 * Math.min(1, t / 0.18);
    data[start + i] += Math.sin(2 * Math.PI * freq * t) * env * level;
  }
};

const addHat = (time, level = 0.035) => {
  const start = Math.floor(time * sampleRate);
  const len = Math.floor(0.045 * sampleRate);
  for (let i = 0; i < len && start + i < samples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 72);
    data[start + i] += (random() * 2 - 1) * env * level;
  }
};

const addPluck = (time, freq = 440, level = 0.028) => {
  const start = Math.floor(time * sampleRate);
  const len = Math.floor(0.12 * sampleRate);
  for (let i = 0; i < len && start + i < samples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 32);
    data[start + i] += Math.sin(2 * Math.PI * freq * t) * env * level;
  }
};

for (let t = 0; t < durationSeconds; t += 1) {
  if ((t >= 18 && t < 20) || (t >= 29.5 && t < 31)) continue;
  addKick(t, t % 4 === 0 ? 0.18 : 0.11);
  addHat(t + 0.5);
}

[2, 6, 10, 14, 17, 22, 25, 29].forEach((t, index) => {
  addPluck(t, [392, 440, 494, 440][index % 4], 0.035);
});

const pcm = Buffer.alloc(samples * 2);
for (let i = 0; i < samples; i++) {
  const clipped = Math.max(-1, Math.min(1, data[i]));
  pcm.writeInt16LE(Math.round(clipped * 32767), i * 2);
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

const output = 'public/audio/common/coba-dipikir-bed.wav';
mkdirSync(dirname(output), {recursive: true});
writeFileSync(output, Buffer.concat([header, pcm]));
console.log(`Generated ${output}`);
