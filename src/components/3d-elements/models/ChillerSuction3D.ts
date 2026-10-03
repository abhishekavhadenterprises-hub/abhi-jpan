import * as THREE from 'three';
import { samplePointsFromGroup } from '../utils/pointSampler';

export class ChillerSuction3D {
  public group: THREE.Group;
  private copperMaterial: THREE.MeshStandardMaterial;
  private flangeMaterial: THREE.MeshStandardMaterial;
  private brassMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // Heavy duty industrial copper
    this.copperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cb6c3c'),
      metalness: 0.93,
      roughness: 0.22,
      envMapIntensity: 1.4,
    });

    // Dark galvanized / industrial steel mounting flange
    this.flangeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#374151'),
      metalness: 0.85,
      roughness: 0.35,
      envMapIntensity: 1.1,
    });

    // Brass Service Valve Port
    this.brassMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d4af37'),
      metalness: 0.92,
      roughness: 0.25,
      envMapIntensity: 1.3,
    });

    this.buildGeometry();
  }

  private buildGeometry() {
    // 1. Compound 3D Bending Tube Curve (Multi-planar HVAC Chiller loop)
    const points = [
      new THREE.Vector3(-3.2, -2.2, 0.5),
      new THREE.Vector3(-2.0, -1.8, 0.4),
      new THREE.Vector3(-1.0, -0.6, 0.0),
      new THREE.Vector3(-0.5, 0.8, -0.4),
      new THREE.Vector3(0.4, 1.8, -0.3),
      new THREE.Vector3(1.6, 2.0, 0.2),
      new THREE.Vector3(2.8, 1.4, 0.6),
      new THREE.Vector3(3.2, -0.2, 0.4),
      new THREE.Vector3(3.0, -1.6, 0.0),
    ];

    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.3);
    const tubeGeom = new THREE.TubeGeometry(curve, 100, 0.46, 24, false);
    const tubeMesh = new THREE.Mesh(tubeGeom, this.copperMaterial);
    this.group.add(tubeMesh);

    // 2. Heavy Industrial Mounting Flange Bracket
    const flangeGeom = new THREE.BoxGeometry(1.6, 1.6, 0.25);
    const flangeMesh = new THREE.Mesh(flangeGeom, this.flangeMaterial);
    flangeMesh.position.set(-2.0, -1.8, 0.4);
    flangeMesh.rotation.set(0.2, 0.4, 0.1);
    this.group.add(flangeMesh);

    // 4 Bolt Studs on the flange
    for (let dx of [-0.6, 0.6]) {
      for (let dy of [-0.6, 0.6]) {
        const boltGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12);
        const bolt = new THREE.Mesh(boltGeom, this.flangeMaterial);
        bolt.position.set(dx, dy, 0.15);
        flangeMesh.add(bolt);
      }
    }

    // 3. Brass Service Valve Port on the upper curve
    const valveBaseGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.8, 16);
    const valveBase = new THREE.Mesh(valveBaseGeom, this.brassMaterial);
    valveBase.position.set(0.4, 2.2, -0.3);
    valveBase.rotation.x = Math.PI * 0.15;
    this.group.add(valveBase);

    // Valve Schrader Cap
    const capGeom = new THREE.CylinderGeometry(0.28, 0.26, 0.35, 16);
    const cap = new THREE.Mesh(capGeom, this.brassMaterial);
    cap.position.set(0.4, 2.7, -0.3);
    this.group.add(cap);

    // 4. Vibration Damper Corrugated Rings section
    for (let r = 0; r < 5; r++) {
      const ringGeom = new THREE.TorusGeometry(0.50, 0.05, 12, 24);
      const ring = new THREE.Mesh(ringGeom, this.copperMaterial);
      ring.position.set(3.1, -0.8 + r * 0.25, 0.2);
      this.group.add(ring);
    }

    this.group.scale.set(0.65, 0.65, 0.65);
  }

  public samplePoints(count: number): Float32Array {
    return samplePointsFromGroup(this.group, count);
  }

  public setOpacity(opacity: number) {
    this.copperMaterial.transparent = opacity < 0.999;
    this.copperMaterial.opacity = opacity;
    this.flangeMaterial.transparent = opacity < 0.999;
    this.flangeMaterial.opacity = opacity;
    this.brassMaterial.transparent = opacity < 0.999;
    this.brassMaterial.opacity = opacity;
    this.group.visible = opacity > 0.005;
  }

  public dispose() {
    this.copperMaterial.dispose();
    this.flangeMaterial.dispose();
    this.brassMaterial.dispose();
    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.dispose();
      }
    });
  }
}
