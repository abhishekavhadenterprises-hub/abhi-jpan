import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve('public/data/pipe_cloud_40k.json');
const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const buffer = new Float32Array(raw.count * 6);
for (let i = 0; i < raw.count * 3; i++) {
  buffer[i] = raw.positions[i];
  buffer[raw.count * 3 + i] = raw.colors[i];
}

const binPath = path.resolve('public/data/pipe_cloud_40k.bin');
fs.writeFileSync(binPath, Buffer.from(buffer.buffer));
console.log(`Saved binary cloud (${buffer.byteLength} bytes) to ${binPath}`);
