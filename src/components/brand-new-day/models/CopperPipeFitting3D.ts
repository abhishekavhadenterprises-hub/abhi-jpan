import * as THREE from 'three';

export class CopperPipeFitting3D {
  public group: THREE.Group;
  private copperMaterial: THREE.MeshStandardMaterial;
  private blueRingMaterial: THREE.MeshStandardMaterial;
  private innerDarkMaterial: THREE.MeshStandardMaterial;

  constructor() {
    this.group = new THREE.Group();

    // 1. Photorealistic PBR Copper Material
    this.copperMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d9774a'), // rich natural copper
      metalness: 0.94,
      roughness: 0.20,
      envMapIntensity: 1.4,
    });

    // 2. Anodized Blue Ring Material (Matching JPAN Industrial Blue & the provided photo)
    this.blueRingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1d4ed8'), // vibrant metallic cobalt blue
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
    // 1. Spline Curve for the S-Bend / U-Bend Copper Pipe
    // Coordinates precisely designed to match the provided image:
    // Left horizontal inlet -> 90 deg elbow down -> diagonal leg with collar -> 180 deg U-bend up -> right vertical outlet
    const curvePoints = [
      new THREE.Vector3(-4.8, 1.8, 0.0),    // Left inlet start
      new THREE.Vector3(-2.8, 1.8, 0.0),    // Straight horizontal inlet run
      new THREE.Vector3(-1.4, 1.7, 0.0),    // Elbow entry
      new THREE.Vector3(-0.4, 0.9, 0.0),    // Elbow turn
      new THREE.Vector3(0.3, -0.2, 0.0),    // Center diagonal (where blue collar sits)
      new THREE.Vector3(1.1, -1.5, 0.0),    // Pre-U-bend
      new THREE.Vector3(1.9, -2.2, 0.0),    // U-bend bottom curve
      new THREE.Vector3(2.8, -1.8, 0.0),    // U-bend right curve up
      new THREE.Vector3(3.2, -0.6, 0.0),    // Vertical run start
      new THREE.Vector3(3.2, 0.6, 0.0),     // Vertical outlet top
    ];

    const spline = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.25);

    // Tube radius = 0.42, 120 tubular segments, 28 radial segments for ultra-smooth cylinder
    const tubeGeom = new THREE.TubeGeometry(spline, 120, 0.42, 28, false);
    const mainTube = new THREE.Mesh(tubeGeom, this.copperMaterial);
    mainTube.castShadow = true;
    mainTube.receiveShadow = true;
    this.group.add(mainTube);

    // 2. Left Flared Connector Socket (Expanded sleeve at the horizontal inlet)
    const socketLength = 0.9;
    const socketRadius = 0.52;
    const socketGeom = new THREE.CylinderGeometry(socketRadius, socketRadius, socketLength, 32, 1, true);
    socketGeom.rotateZ(Math.PI / 2); // align horizontal
    const leftSocket = new THREE.Mesh(socketGeom, this.copperMaterial);
    leftSocket.position.set(-4.5, 1.8, 0.0);
    this.group.add(leftSocket);

    // Raised lip ring on the left socket
    const lipGeom = new THREE.TorusGeometry(socketRadius, 0.045, 16, 32);
    lipGeom.rotateY(Math.PI / 2);
    const leftLip = new THREE.Mesh(lipGeom, this.copperMaterial);
    leftLip.position.set(-4.05, 1.8, 0.0);
    this.group.add(leftLip);

    // Left inner dark disc (creates hollow depth illusion)
    const discGeom = new THREE.CircleGeometry(0.40, 32);
    discGeom.rotateY(Math.PI / 2);
    const leftDisc = new THREE.Mesh(discGeom, this.innerDarkMaterial);
    leftDisc.position.set(-4.2, 1.8, 0.0);
    this.group.add(leftDisc);

    // 3. Right Flared Connector Socket (Expanded sleeve at vertical outlet)
    const rightSocketGeom = new THREE.CylinderGeometry(socketRadius, socketRadius, socketLength, 32, 1, true);
    const rightSocket = new THREE.Mesh(rightSocketGeom, this.copperMaterial);
    rightSocket.position.set(3.2, 0.4, 0.0);
    this.group.add(rightSocket);

    // Raised lip ring on the right socket
    const rightLipGeom = new THREE.TorusGeometry(socketRadius, 0.045, 16, 32);
    rightLipGeom.rotateX(Math.PI / 2);
    const rightLip = new THREE.Mesh(rightLipGeom, this.copperMaterial);
    rightLip.position.set(3.2, 0.0, 0.0);
    this.group.add(rightLip);

    // Right inner dark disc
    const rightDiscGeom = new THREE.CircleGeometry(0.40, 32);
    rightDiscGeom.rotateX(Math.PI / 2);
    const rightDisc = new THREE.Mesh(rightDiscGeom, this.innerDarkMaterial);
    rightDisc.position.set(3.2, 0.2, 0.0);
    this.group.add(rightDisc);

    // 4. Anodized Blue Ring / Collar in the middle diagonal section
    // Outer radius: 0.58, length: 0.72
    const ringGeom = new THREE.CylinderGeometry(0.58, 0.58, 0.72, 36);
    // Align with the diagonal direction of the spline at t ~= 0.45
    // Angle roughly ~56 deg
    ringGeom.rotateZ(0.98);
    const blueRing = new THREE.Mesh(ringGeom, this.blueRingMaterial);
    blueRing.position.set(0.32, -0.15, 0.0);
    this.group.add(blueRing);

    // Chamfered borders on the blue ring
    const chamferGeom1 = new THREE.TorusGeometry(0.58, 0.035, 16, 36);
    chamferGeom1.rotateZ(0.98);
    chamferGeom1.rotateY(Math.PI / 2);
    // Bevel edges
    const ringRim1 = new THREE.Mesh(chamferGeom1, this.blueRingMaterial);
    ringRim1.position.set(0.12, 0.15, 0.0);
    this.group.add(ringRim1);

    const ringRim2 = new THREE.Mesh(chamferGeom1.clone(), this.blueRingMaterial);
    ringRim2.position.set(0.52, -0.45, 0.0);
    this.group.add(ringRim2);

    // Center the overall model pivot
    this.group.position.set(0, 0, 0);
    // Scale slightly for majestic background framing
    this.group.scale.setScalar(1.25);
  }

  public dispose() {
    this.copperMaterial.dispose();
    this.blueRingMaterial.dispose();
    this.innerDarkMaterial.dispose();
    this.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    });
  }
}
