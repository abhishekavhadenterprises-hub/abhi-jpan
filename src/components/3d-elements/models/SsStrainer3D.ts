import * as THREE from 'three';
import { samplePointsFromGroup } from '../utils/pointSampler';

export class SsStrainer3D {
  public group: THREE.Group;
  private ssMaterial: THREE.MeshStandardMaterial;
  private ssBrushedMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // High Polish Stainless Steel PBR Material
    this.ssMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e2e8f0'),
      metalness: 0.96,
      roughness: 0.14,
      envMapIntensity: 1.6,
    });

    // Brushed Stainless Steel for Chamber & Flanges
    this.ssBrushedMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cbd5e1'),
      metalness: 0.92,
      roughness: 0.28,
      envMapIntensity: 1.2,
    });

    this.buildGeometry();
  }

  private buildGeometry() {
    // 1. Main Horizontal Flow Cylinder
    const mainRadius = 0.65;
    const mainLength = 4.8;
    const mainGeom = new THREE.CylinderGeometry(mainRadius, mainRadius, mainLength, 32);
    mainGeom.rotateZ(Math.PI / 2);
    const mainPipe = new THREE.Mesh(mainGeom, this.ssMaterial);
    this.group.add(mainPipe);

    // Left Welding Neck Flange
    const flangeRadius = 1.15;
    const flangeThick = 0.32;
    const leftFlangeGeom = new THREE.CylinderGeometry(flangeRadius, flangeRadius, flangeThick, 32);
    leftFlangeGeom.rotateZ(Math.PI / 2);
    const leftFlange = new THREE.Mesh(leftFlangeGeom, this.ssBrushedMaterial);
    leftFlange.position.set(-mainLength / 2, 0, 0);
    this.group.add(leftFlange);

    // Right Welding Neck Flange
    const rightFlange = new THREE.Mesh(leftFlangeGeom, this.ssBrushedMaterial);
    rightFlange.position.set(mainLength / 2, 0, 0);
    this.group.add(rightFlange);

    // Bolt holes around flanges
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const r = 0.92;
      const holeY = Math.sin(angle) * r;
      const holeZ = Math.cos(angle) * r;

      const boltGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.45, 12);
      boltGeom.rotateZ(Math.PI / 2);

      const boltL = new THREE.Mesh(boltGeom, this.ssMaterial);
      boltL.position.set(-mainLength / 2, holeY, holeZ);
      this.group.add(boltL);

      const boltR = new THREE.Mesh(boltGeom, this.ssMaterial);
      boltR.position.set(mainLength / 2, holeY, holeZ);
      this.group.add(boltR);
    }

    // 2. Angled Y-Strainer Filter Basket Leg (45 degree take-off)
    const legRadius = 0.72;
    const legLength = 2.6;
    const legGeom = new THREE.CylinderGeometry(legRadius, legRadius * 0.9, legLength, 32);
    const leg = new THREE.Mesh(legGeom, this.ssBrushedMaterial);
    leg.position.set(0.3, -1.0, 0);
    leg.rotation.z = Math.PI * 0.25; // 45 degree angle
    this.group.add(leg);

    // Filter Cleanout Hexagonal Cap at end of leg
    const hexCapGeom = new THREE.CylinderGeometry(0.85, 0.85, 0.4, 6);
    const hexCap = new THREE.Mesh(hexCapGeom, this.ssMaterial);
    hexCap.position.set(1.2, -1.9, 0);
    hexCap.rotation.z = Math.PI * 0.25;
    this.group.add(hexCap);

    // Central Hex Nut on cap
    const hexNutGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.3, 6);
    const hexNut = new THREE.Mesh(hexNutGeom, this.ssMaterial);
    hexNut.position.set(1.4, -2.1, 0);
    hexNut.rotation.z = Math.PI * 0.25;
    this.group.add(hexNut);

    // 3. Flow Direction Arrow Emboss
    const arrowGeom = new THREE.ConeGeometry(0.2, 0.5, 16);
    arrowGeom.rotateZ(-Math.PI / 2);
    const arrow = new THREE.Mesh(arrowGeom, this.ssMaterial);
    arrow.position.set(0.0, mainRadius + 0.08, 0);
    this.group.add(arrow);

    this.group.scale.set(0.65, 0.65, 0.65);
  }

  public samplePoints(count: number): Float32Array {
    return samplePointsFromGroup(this.group, count);
  }

  public setOpacity(opacity: number) {
    this.ssMaterial.transparent = opacity < 0.999;
    this.ssMaterial.opacity = opacity;
    this.ssBrushedMaterial.transparent = opacity < 0.999;
    this.ssBrushedMaterial.opacity = opacity;
    this.group.visible = opacity > 0.005;
  }

  public dispose() {
    this.ssMaterial.dispose();
    this.ssBrushedMaterial.dispose();
    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.dispose();
      }
    });
  }
}
