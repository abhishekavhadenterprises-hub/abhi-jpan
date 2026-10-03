import * as THREE from 'three';
import { samplePointsFromGroup } from '../utils/pointSampler';

export class BrassDistributor3D {
  public group: THREE.Group;
  private brassMaterial: THREE.MeshStandardMaterial;
  private copperTubeMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // Machined Brass Material
    this.brassMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d4af37'),
      metalness: 0.92,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });

    // Copper capillary tubes
    this.copperTubeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cf7948'),
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.3,
    });

    this.buildGeometry();
  }

  private buildGeometry() {
    // 1. Central Brass Distributor Body (Cylindrical manifold base)
    const bodyGeom = new THREE.CylinderGeometry(0.9, 0.8, 2.2, 32);
    const body = new THREE.Mesh(bodyGeom, this.brassMaterial);
    body.position.set(0, -0.6, 0);
    this.group.add(body);

    // Hexagonal collar ring on the body (machined CNC flat flats)
    const hexGeom = new THREE.CylinderGeometry(1.05, 1.05, 0.6, 6);
    const hexCollar = new THREE.Mesh(hexGeom, this.brassMaterial);
    hexCollar.position.set(0, -0.8, 0);
    this.group.add(hexCollar);

    // Main inlet pipe at bottom
    const inletGeom = new THREE.CylinderGeometry(0.55, 0.55, 1.4, 24);
    const inlet = new THREE.Mesh(inletGeom, this.brassMaterial);
    inlet.position.set(0, -2.1, 0);
    this.group.add(inlet);

    // Inlet lip ring
    const inletLip = new THREE.TorusGeometry(0.56, 0.05, 16, 24);
    inletLip.rotateX(Math.PI / 2);
    const lipMesh = new THREE.Mesh(inletLip, this.brassMaterial);
    lipMesh.position.set(0, -2.8, 0);
    this.group.add(lipMesh);

    // Top distribution cap
    const topCapGeom = new THREE.CylinderGeometry(0.95, 0.9, 0.4, 32);
    const topCap = new THREE.Mesh(topCapGeom, this.brassMaterial);
    topCap.position.set(0, 0.6, 0);
    this.group.add(topCap);

    // 2. 8 Radial Branching Capillary Tubes curving outward and upward
    const numTubes = 8;
    for (let i = 0; i < numTubes; i++) {
      const angle = (i / numTubes) * Math.PI * 2;
      const r = 0.55;
      const startX = Math.cos(angle) * r;
      const startZ = Math.sin(angle) * r;

      const midX = Math.cos(angle) * 1.5;
      const midZ = Math.sin(angle) * 1.5;

      const endX = Math.cos(angle) * 1.8;
      const endZ = Math.sin(angle) * 1.8;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, 0.7, startZ),
        new THREE.Vector3(midX, 1.8, midZ),
        new THREE.Vector3(endX, 3.2, endZ),
      ]);

      const tubeGeom = new THREE.TubeGeometry(curve, 28, 0.09, 12, false);
      const tubeMesh = new THREE.Mesh(tubeGeom, this.copperTubeMaterial);
      this.group.add(tubeMesh);

      // Flared tips at the end of each capillary tube
      const tipGeom = new THREE.CylinderGeometry(0.12, 0.09, 0.3, 12);
      const tipMesh = new THREE.Mesh(tipGeom, this.brassMaterial);
      tipMesh.position.set(endX, 3.25, endZ);
      tipMesh.lookAt(new THREE.Vector3(endX * 1.5, 4.0, endZ * 1.5));
      this.group.add(tipMesh);
    }

    this.group.scale.set(0.65, 0.65, 0.65);
  }

  public samplePoints(count: number): Float32Array {
    return samplePointsFromGroup(this.group, count);
  }

  public setOpacity(opacity: number) {
    this.brassMaterial.transparent = opacity < 0.999;
    this.brassMaterial.opacity = opacity;
    this.copperTubeMaterial.transparent = opacity < 0.999;
    this.copperTubeMaterial.opacity = opacity;
    this.group.visible = opacity > 0.005;
  }

  public dispose() {
    this.brassMaterial.dispose();
    this.copperTubeMaterial.dispose();
    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.dispose();
      }
    });
  }
}
