import * as THREE from 'three';
import { ScrollState, clamp01 } from './types';

export class BeadCloud {
  public group: THREE.Group;
  public instancedMesh: THREE.InstancedMesh | null = null;
  private dummy: THREE.Object3D;
  private initialMatrices: Float32Array;
  private count = 40000;
  private isLoaded = false;
  private center = new THREE.Vector3(0, 9, 0);

  constructor() {
    this.group = new THREE.Group();
    this.dummy = new THREE.Object3D();
    this.initialMatrices = new Float32Array(this.count * 16);
    this.init();
  }

  private async init() {
    // 1. Instanced sphere geometry (radius 0.05 - 0.06 scaled, 8x6 segments for high performance)
    const geometry = new THREE.SphereGeometry(0.065, 8, 6);
    const material = new THREE.MeshBasicMaterial({
      toneMapped: true,
    });

    this.instancedMesh = new THREE.InstancedMesh(geometry, material, this.count);
    this.instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    // 2. Fetch pre-generated binary cloud data or fallback to JSON
    try {
      const res = await fetch('/data/pipe_cloud_40k.bin');
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const floatData = new Float32Array(buffer);
        this.populateFromData(floatData);
      } else {
        await this.fallbackFetchJson();
      }
    } catch {
      await this.fallbackFetchJson();
    }
  }

  private async fallbackFetchJson() {
    try {
      const res = await fetch('/data/pipe_cloud_40k.json');
      if (res.ok) {
        const json = await res.json();
        const floatData = new Float32Array(this.count * 6);
        for (let i = 0; i < this.count * 3; i++) {
          floatData[i] = json.positions[i];
          floatData[this.count * 3 + i] = json.colors[i];
        }
        this.populateFromData(floatData);
      }
    } catch (e) {
      console.warn('Could not load pre-generated cloud, using procedural fallback', e);
      this.proceduralFallback();
    }
  }

  private populateFromData(data: Float32Array) {
    if (!this.instancedMesh) return;

    const colors = new Float32Array(this.count * 3);
    const posOffset = 0;
    const colorOffset = this.count * 3;

    for (let i = 0; i < this.count; i++) {
      const x = data[posOffset + i * 3 + 0];
      const y = data[posOffset + i * 3 + 1];
      const z = data[posOffset + i * 3 + 2];

      this.dummy.position.set(x, y, z);
      this.dummy.scale.setScalar(1.0);
      this.dummy.updateMatrix();

      this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
      // Cache initial matrix
      this.dummy.matrix.toArray(this.initialMatrices, i * 16);

      // Color with tone-mapped gain
      const cr = data[colorOffset + i * 3 + 0];
      const cg = data[colorOffset + i * 3 + 1];
      const cb = data[colorOffset + i * 3 + 2];

      colors[i * 3 + 0] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    this.instancedMesh.instanceColor.needsUpdate = true;

    this.group.add(this.instancedMesh);
    this.isLoaded = true;
  }

  private proceduralFallback() {
    if (!this.instancedMesh) return;
    const colors = new Float32Array(this.count * 3);

    for (let i = 0; i < this.count; i++) {
      const t = i / this.count;
      const angle = t * Math.PI * 4;
      const x = Math.sin(angle) * 3.5;
      const y = t * 14.0 + 2.0;
      const z = Math.cos(angle) * 1.5;

      this.dummy.position.set(x, y, z);
      this.dummy.scale.setScalar(1.0);
      this.dummy.updateMatrix();
      this.instancedMesh.setMatrixAt(i, this.dummy.matrix);

      // Scarlet base
      colors[i * 3 + 0] = 0.88;
      colors[i * 3 + 1] = 0.15;
      colors[i * 3 + 2] = 0.20;
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    this.instancedMesh.instanceColor.needsUpdate = true;
    this.group.add(this.instancedMesh);
    this.isLoaded = true;
  }

  /**
   * Evaluated once per frame strictly as a function of scrollState
   * Zero state, zero springs, pure scalar function
   */
  public update(state: ScrollState) {
    if (!this.isLoaded || !this.instancedMesh) return;

    const { sp, mouseX, mouseY } = state;

    // Idle motion: float on sp + cursor tilt with compensating translation
    // to keep pivot centered at (0, 9, 0)
    const floatY = Math.sin(sp * Math.PI * 8.0) * 0.25;
    const tiltX = mouseY * 0.18;
    const tiltY = mouseX * 0.28;

    // Compensating translation keeping pivot at (0, 9, 0)
    // P_world = Pivot + Rotation * (P_local - Pivot)
    this.group.position.set(0, floatY, 0);

    // Apply rotation around pivot
    this.group.rotation.x = tiltX;
    this.group.rotation.y = tiltY;

    // As sp moves past Act 1 (sp > 0.22), the figure gently recedes as the camera plunges into the corridor
    if (sp > 0.22) {
      const fadeProgress = clamp01((sp - 0.22) / 0.12);
      const scale = 1.0 - fadeProgress * 0.95;
      this.group.scale.setScalar(scale);
      this.group.position.z = -fadeProgress * 25.0;
      this.instancedMesh.visible = scale > 0.05;
    } else {
      this.group.scale.setScalar(1.0);
      this.group.position.z = 0;
      this.instancedMesh.visible = true;
    }
  }

  public dispose() {
    if (this.instancedMesh) {
      this.instancedMesh.geometry.dispose();
      if (Array.isArray(this.instancedMesh.material)) {
        this.instancedMesh.material.forEach((m) => m.dispose());
      } else {
        this.instancedMesh.material.dispose();
      }
    }
  }
}
