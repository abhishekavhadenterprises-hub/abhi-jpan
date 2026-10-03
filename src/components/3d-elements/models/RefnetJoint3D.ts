import * as THREE from 'three';
import { samplePointsFromGroup } from '../utils/pointSampler';

export class RefnetJoint3D {
  public group: THREE.Group;
  private copperMaterial: THREE.MeshStandardMaterial;
  private ringMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // Polished Copper PBR Material
    this.copperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d9774a'),
      metalness: 0.94,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    // Darker braze ring accent
    this.ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9c4524'),
      metalness: 0.88,
      roughness: 0.3,
      envMapIntensity: 1.1,
    });

    this.buildGeometry();
  }

  private buildGeometry() {
    // 1. Single Main Inlet Trunk (Left)
    const inletRadius = 0.58;
    const inletLength = 2.0;
    const inletGeom = new THREE.CylinderGeometry(inletRadius, inletRadius, inletLength, 28);
    inletGeom.rotateZ(Math.PI / 2);
    const inlet = new THREE.Mesh(inletGeom, this.copperMaterial);
    inlet.position.set(-2.5, 0, 0);
    this.group.add(inlet);

    // Inlet stepped sleeve
    const sleeveGeom = new THREE.CylinderGeometry(inletRadius * 1.12, inletRadius, 0.6, 28);
    sleeveGeom.rotateZ(Math.PI / 2);
    const sleeve = new THREE.Mesh(sleeveGeom, this.copperMaterial);
    sleeve.position.set(-3.5, 0, 0);
    this.group.add(sleeve);

    // 2. Central Bifurcation Transition Throat (Widening aerodynamic chamber)
    const throatGeom = new THREE.CylinderGeometry(1.05, inletRadius, 1.6, 32);
    throatGeom.rotateZ(Math.PI / 2);
    const throat = new THREE.Mesh(throatGeom, this.copperMaterial);
    throat.position.set(-0.7, 0, 0);
    this.group.add(throat);

    // 3. Upper Branch Arm curving smoothly upward and outward
    const upperCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 0.35, 0.0),
      new THREE.Vector3(0.8, 0.9, 0.0),
      new THREE.Vector3(1.8, 1.4, 0.0),
      new THREE.Vector3(3.0, 1.4, 0.0),
    ]);
    const upperTubeGeom = new THREE.TubeGeometry(upperCurve, 40, 0.42, 24, false);
    const upperTube = new THREE.Mesh(upperTubeGeom, this.copperMaterial);
    this.group.add(upperTube);

    // Upper Branch Stepped Sizing Reducers (3 staged diameters)
    const step1Geom = new THREE.CylinderGeometry(0.36, 0.42, 0.5, 24);
    step1Geom.rotateZ(Math.PI / 2);
    const step1 = new THREE.Mesh(step1Geom, this.copperMaterial);
    step1.position.set(3.25, 1.4, 0.0);
    this.group.add(step1);

    const step2Geom = new THREE.CylinderGeometry(0.30, 0.36, 0.5, 24);
    step2Geom.rotateZ(Math.PI / 2);
    const step2 = new THREE.Mesh(step2Geom, this.copperMaterial);
    step2.position.set(3.75, 1.4, 0.0);
    this.group.add(step2);

    // 4. Lower Branch Arm curving smoothly downward and outward
    const lowerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, -0.35, 0.0),
      new THREE.Vector3(0.8, -0.9, 0.0),
      new THREE.Vector3(1.8, -1.4, 0.0),
      new THREE.Vector3(3.0, -1.4, 0.0),
    ]);
    const lowerTubeGeom = new THREE.TubeGeometry(lowerCurve, 40, 0.42, 24, false);
    const lowerTube = new THREE.Mesh(lowerTubeGeom, this.copperMaterial);
    this.group.add(lowerTube);

    // Lower Branch Stepped Sizing Reducers
    const lStep1Geom = new THREE.CylinderGeometry(0.36, 0.42, 0.5, 24);
    lStep1Geom.rotateZ(Math.PI / 2);
    const lStep1 = new THREE.Mesh(lStep1Geom, this.copperMaterial);
    lStep1.position.set(3.25, -1.4, 0.0);
    this.group.add(lStep1);

    const lStep2Geom = new THREE.CylinderGeometry(0.30, 0.36, 0.5, 24);
    lStep2Geom.rotateZ(Math.PI / 2);
    const lStep2 = new THREE.Mesh(lStep2Geom, this.copperMaterial);
    lStep2.position.set(3.75, -1.4, 0.0);
    this.group.add(lStep2);

    // Joint reinforcement bridge / brazed web between the two branches
    const webGeom = new THREE.BoxGeometry(0.5, 0.6, 0.2);
    const webMesh = new THREE.Mesh(webGeom, this.ringMaterial);
    webMesh.position.set(1.1, 0, 0);
    this.group.add(webMesh);

    this.group.scale.set(0.65, 0.65, 0.65);
  }

  public samplePoints(count: number): Float32Array {
    return samplePointsFromGroup(this.group, count);
  }

  public setOpacity(opacity: number) {
    this.copperMaterial.transparent = opacity < 0.999;
    this.copperMaterial.opacity = opacity;
    this.ringMaterial.transparent = opacity < 0.999;
    this.ringMaterial.opacity = opacity;
    this.group.visible = opacity > 0.005;
  }

  public dispose() {
    this.copperMaterial.dispose();
    this.ringMaterial.dispose();
    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.dispose();
      }
    });
  }
}
