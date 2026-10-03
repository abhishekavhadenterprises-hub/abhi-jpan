import * as THREE from 'three';
import { samplePointsFromGroup } from '../utils/pointSampler';

export class CopperPipeFitting3D {
  public group: THREE.Group;
  private copperMaterial: THREE.MeshStandardMaterial;
  private blueRingMaterial: THREE.MeshStandardMaterial;
  private innerDarkMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // 1. Photorealistic PBR Copper Material
    this.copperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d9774a'),
      metalness: 0.94,
      roughness: 0.20,
      envMapIntensity: 1.4,
    });

    // 2. Anodized Blue Ring Material
    this.blueRingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1d4ed8'),
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.2,
    });

    // 3. Dark interior for hollow tube ends
    this.innerDarkMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#150808'),
      metalness: 0.8,
      roughness: 0.8,
    });

    this.buildGeometry();
  }

  private buildGeometry() {
    // S-Bend / U-Bend Copper Pipe
    const curvePoints = [
      new THREE.Vector3(-4.2, 1.6, 0.0),
      new THREE.Vector3(-2.5, 1.6, 0.0),
      new THREE.Vector3(-1.2, 1.5, 0.0),
      new THREE.Vector3(-0.3, 0.8, 0.0),
      new THREE.Vector3(0.3, -0.2, 0.0),
      new THREE.Vector3(1.0, -1.3, 0.0),
      new THREE.Vector3(1.8, -1.9, 0.0),
      new THREE.Vector3(2.6, -1.5, 0.0),
      new THREE.Vector3(3.0, -0.5, 0.0),
      new THREE.Vector3(3.0, 0.6, 0.0),
    ];

    const spline = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.25);
    const tubeGeom = new THREE.TubeGeometry(spline, 100, 0.42, 24, false);
    const mainTube = new THREE.Mesh(tubeGeom, this.copperMaterial);
    this.group.add(mainTube);

    // Left Flared Connector Socket
    const socketGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.8, 24, 1, true);
    socketGeom.rotateZ(Math.PI / 2);
    const leftSocket = new THREE.Mesh(socketGeom, this.copperMaterial);
    leftSocket.position.set(-3.9, 1.6, 0.0);
    this.group.add(leftSocket);

    // Left Lip Ring
    const lipGeom = new THREE.TorusGeometry(0.52, 0.045, 16, 24);
    lipGeom.rotateY(Math.PI / 2);
    const leftLip = new THREE.Mesh(lipGeom, this.copperMaterial);
    leftLip.position.set(-3.5, 1.6, 0.0);
    this.group.add(leftLip);

    // Right Flared Connector Socket
    const rightSocketGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.8, 24, 1, true);
    const rightSocket = new THREE.Mesh(rightSocketGeom, this.copperMaterial);
    rightSocket.position.set(3.0, 0.4, 0.0);
    this.group.add(rightSocket);

    const rightLipGeom = new THREE.TorusGeometry(0.52, 0.045, 16, 24);
    rightLipGeom.rotateX(Math.PI / 2);
    const rightLip = new THREE.Mesh(rightLipGeom, this.copperMaterial);
    rightLip.position.set(3.0, 0.0, 0.0);
    this.group.add(rightLip);

    // Blue Identification Ring Collar
    const collarGeom = new THREE.CylinderGeometry(0.56, 0.56, 0.45, 24, 1);
    const collar = new THREE.Mesh(collarGeom, this.blueRingMaterial);
    collar.position.set(0.3, -0.2, 0.0);
    collar.rotation.z = -Math.PI * 0.35;
    this.group.add(collar);

    // Scale to balanced bounding box
    this.group.scale.set(0.65, 0.65, 0.65);
  }

  public samplePoints(count: number): Float32Array {
    return samplePointsFromGroup(this.group, count);
  }

  public setOpacity(opacity: number) {
    this.copperMaterial.transparent = opacity < 0.999;
    this.copperMaterial.opacity = opacity;
    this.blueRingMaterial.transparent = opacity < 0.999;
    this.blueRingMaterial.opacity = opacity;
    this.innerDarkMaterial.transparent = opacity < 0.999;
    this.innerDarkMaterial.opacity = opacity;
    this.group.visible = opacity > 0.005;
  }

  public dispose() {
    this.copperMaterial.dispose();
    this.blueRingMaterial.dispose();
    this.innerDarkMaterial.dispose();
    this.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry.dispose();
      }
    });
  }
}
