export interface ScrollState {
  p: number;      // raw scroll position [0, 1]
  sp: number;     // act axis = clamp01(p / 0.82)
  targetP: number;
  mouseX: number; // normalized [-1, 1]
  mouseY: number; // normalized [-1, 1]
  targetMouseX: number;
  targetMouseY: number;
  reducedMotion: boolean;
  dpr: number;
}

export interface ConduitEntry {
  at: number;     // position on act axis sp
  span: number;   // active duration
  side: number;   // -1 (left) or +1 (right)
  radius: number; // anchor radius
  lift: number;   // vertical lift
  lead: number;   // forward lead ~= 3.8 * radius
}

export interface ActGates {
  act1: number;
  act2: number;
  act3: number;
  act4: number;
  act5: number;
  act6: number;
}

export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
