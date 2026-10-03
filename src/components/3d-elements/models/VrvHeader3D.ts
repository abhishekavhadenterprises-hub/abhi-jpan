import * as THREE from 'three';
import { samplePointsFromGroup } from '../utils/pointSampler';

export class VrvHeader3D {
  public group: THREE.Group;
  private copperMaterial: THREE.MeshStandardMaterial;
  private brazeRingMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // High Polish PBR Copper
    this.copperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d47a4c'),
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.4,
    });

    // Silver / Phosphorus Braze Alloy ring at joints
    this.brazeRingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b0bec5'),
      metalness: 0.9,
      roughness: 0.35,
      envMapIntensity: 1.0,
    });

    this.buildGeometry();
  }

  private buildGeometry() {
    // 1. Main Horizontal Header Pipe Trunk
    const trunkRadius = 0.58;
    const trunkLength = 6.2;
    const trunkGeom = new THREE.CylinderGeometry(trunkRadius, trunkRadius, trunkLength, 32);
    trunkGeom.rotateZ(Math.PI / 2);
    const trunkMesh = new THREE.Mesh(trunkGeom, this.copperMaterial);
    this.group.add(trunkMesh);

    // Domed End Cap on Left
    const domeGeom = new THREE.SphereGeometry(trunkRadius, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    domeGeom.rotateZ(Math.PI / 2);
    const domeMesh = new THREE.Mesh(domeGeom, this.copperMaterial);
    domeMesh.position.set(-trunkLength / 2, 0, 0);
    this.group.add(domeMesh);

    // Flared Connector on Right
    const rightFlangeGeom = new THREE.CylinderGeometry(trunkRadius * 1.18, trunkRadius, 0.7, 32);
    rightFlangeGeom.rotateZ(-Math.PI / 2);
    const rightFlange = new THREE.Mesh(rightFlangeGeom, this.copperMaterial);
    rightFlange.position.set(trunkLength / 2 + 0.35, 0, 0);
    this.group.add(rightFlange);

    // 2. 5 Vertical Feeder Branch Pipes brazed to the trunk
    const branchCount = 5;
    const branchSpacing = 0.95;
    const startX = -((branchCount - 1) * branchSpacing) / 2;
    const branchRadius = 0.28;
    const branchHeight = 1.8;

    for (let i = 0; i < branchCount; i++) {
      const bx = startX + i * branchSpacing;

      // Vertical Branch Pipe
      const branchGeom = new THREE.CylinderGeometry(branchRadius, branchRadius, branchHeight, 24);
      const branch = new THREE.Mesh(branchGeom, this.copperMaterial);
      branch.position.set(bx, trunkRadius + branchHeight / 2 - 0.05, 0);
      this.group.add(branch);

      // Braze fillet collar ring at intersection
      const brazeGeom = new THREE.TorusGeometry(branchRadius * 1.15, 0.055, 12, 24);
      brazeGeom.rotateX(Math.PI / 2);
      const brazeMesh = new THREE.Mesh(brazeGeom, this.brazeRingMaterial);
      brazeMesh.position.set(bx, trunkRadius, 0);
      this.group.add(brazeMesh);

      // Flared outlet tip at top of branch
      const tipGeom = new THREE.CylinderGeometry(branchRadius * 1.25, branchRadius, 0.35, 24);
      const tipMesh = new THREE.Mesh(tipGeom, this.copperMaterial);
      tipMesh.position.set(bx, trunkRadius + branchHeight + 0.15, 0);
      this.group.add(tipMesh);
    }

    // 3. Staggered Lower Sensor Ports
    const sensorGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.9, 16);
    const sensorMesh = new THREE.Mesh(sensorGeom, this.copperMaterial);
    sensorMesh.position.set(0.6, -trunkRadius - 0.4, 0);
    this.group.add(sensorMesh);

    this.group.scale.set(0.6, 0.6, 0.6);
  }

  public samplePoints(count: number): Float32Array {
    return samplePointsFromGroup(this.group, count);
  }

  public setOpacity(opacity: number) {
    this.copperMaterial.transparent = opacity < 0.999;
    this.copperMaterial.opacity = opacity;
    this.brazeRingMaterial.transparent = opacity < 0.999;
    this.brazeRingMaterial.opacity = opacity;
    this.group.visible = opacity > 0.005;
  }

  public dispose() {
    this.copperMaterial.dispose();
    this.brazeRingMaterial.dispose();
    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.dispose();
      }
    });
  }
}
