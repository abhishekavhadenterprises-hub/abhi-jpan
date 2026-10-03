import * as THREE from 'three';

const ParticleVertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  uniform float uDisplayMode; // 0 = Alloy, 1 = CMM Laser X-Ray, 2 = Kinetic Ferrofluid
  uniform vec3 uOffsetStart;
  uniform vec3 uOffsetEnd;
  uniform vec3 uModelRotation;
  uniform vec3 uMouseWorld;
  uniform float uMouseStrength;

  attribute vec3 aTargetPos;
  attribute vec3 aNormal;
  attribute vec3 aTargetNormal;
  attribute vec3 aSeed;

  varying vec3 vWorldPos;
  varying vec3 vViewPos;
  varying vec3 vSurfaceNormal;
  varying float vProgress;
  varying float vSeed;
  varying float vScanWave;
  varying float vDispersion;
  varying float vElevation;
  varying float vMouseDist;

  // Precision Euler rotation matrix around origin
  mat3 getEulerRotationMatrix(vec3 angles) {
    float cx = cos(angles.x);
    float sx = sin(angles.x);
    float cy = cos(angles.y);
    float sy = sin(angles.y);
    float cz = cos(angles.z);
    float sz = sin(angles.z);

    return mat3(
      cy * cz, -cy * sz, sy,
      sx * sy * cz + cx * sz, -sx * sy * sz + cx * cz, -sx * cy,
      -cx * sy * cz + sx * sz, cx * sy * sz + sx * cz, cx * cy
    );
  }

  // Aerodynamic golden-spiral vortex & laminar ferrofluid stream
  vec3 getFerrofluidVortex(vec3 p, vec3 dir, float t, vec3 seed) {
    // Golden angle spiral rotation
    float spiralAngle = (t * 9.42477 + seed.x * 6.28318) * (seed.y >= 0.0 ? 1.0 : -1.0);
    float envelope = sin(t * 3.14159265);
    float radius = envelope * (1.15 + 0.65 * seed.z);

    // Dynamic orthonormal frame along transit direction
    vec3 up = abs(dir.y) < 0.98 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 u = normalize(cross(dir, up));
    vec3 v = cross(dir, u);

    // Cohesive vortex ribbon
    vec3 ribbon = (u * cos(spiralAngle) + v * sin(spiralAngle)) * radius;

    // High-frequency magnetic curl harmonics
    vec3 curl = vec3(
      sin(p.y * 3.4 + uTime * 2.5 + seed.x * 6.28),
      cos(p.z * 3.4 + uTime * 2.5 + seed.y * 6.28),
      sin(p.x * 3.4 + uTime * 2.5 + seed.z * 6.28)
    ) * (radius * 0.38);

    return ribbon + curl;
  }

  void main() {
    mat3 rotMat = getEulerRotationMatrix(uModelRotation);

    // 1. Rigid rotation of CAD geometry and physical surface normals
    vec3 rotStart = rotMat * position;
    vec3 rotEnd = rotMat * aTargetPos;

    vec3 normStart = rotMat * aNormal;
    vec3 normEnd = rotMat * aTargetNormal;

    // Corner offset translations
    vec3 pStart = rotStart + uOffsetStart;
    vec3 pEnd = rotEnd + uOffsetEnd;

    // 2. Individual non-linear phase stagger (organic peel-away)
    float seedNorm = aSeed.x * 0.5 + 0.5;
    float stagger = 0.25;
    float pClamped = clamp(uProgress, 0.0, 1.0);
    float pLocal = clamp((pClamped - seedNorm * stagger) / (1.0 - stagger), 0.0, 1.0);

    // Precision Quintic Smoothstep for physical momentum
    float smoothP = pLocal * pLocal * pLocal * (pLocal * (pLocal * 6.0 - 15.0) + 10.0);

    // 3. Trajectory & Direction
    vec3 travelVec = pEnd - pStart;
    float travelDist = length(travelVec);
    vec3 travelDir = travelDist > 0.001 ? travelVec / travelDist : vec3(0.0, 1.0, 0.0);

    vec3 currentPos = mix(pStart, pEnd, smoothP);
    vec3 interpolatedNormal = normalize(mix(normStart, normEnd, smoothP));

    // Dynamic flight arc: zero at rest, peaks mid-flight
    float arc = sin(smoothP * 3.14159265);
    if (pClamped > 0.0001 && pClamped < 0.9999 && arc > 0.001) {
      vec3 vortex = getFerrofluidVortex(currentPos, travelDir, smoothP, aSeed);
      currentPos += vortex * 1.05;
    }

    // 4. Interactive Magnetic Cursor Probe
    vec3 toMouse = currentPos - uMouseWorld;
    float mouseDist = length(toMouse.xy);
    vMouseDist = mouseDist;
    float mouseRadius = 3.2;

    if (mouseDist < mouseRadius && uMouseStrength > 0.01) {
      float force = (1.0 - smoothstep(0.0, mouseRadius, mouseDist)) * uMouseStrength;
      // Elastic lens deflection + forward depth pull
      currentPos.xy += normalize(toMouse.xy + 0.0001) * force * 0.45;
      currentPos.z += force * 0.35;
    }

    // 5. Metrology Laser Scanline & Elevation Contours
    float scanSpeed = uDisplayMode == 1.0 ? 3.5 : 2.0;
    float scan = sin(currentPos.y * 2.0 - uTime * scanSpeed + currentPos.x * 0.8);
    vScanWave = pow(clamp(scan * 0.5 + 0.5, 0.0, 1.0), 7.0);
    vElevation = currentPos.y;

    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vWorldPos = currentPos;
    vViewPos = mvPosition.xyz;
    vSurfaceNormal = interpolatedNormal;
    vProgress = pClamped;
    vSeed = seedNorm;
    vDispersion = arc;

    // 6. Dynamic Point Size with Distance Bokeh & Laser Mode
    float baseSize = uBaseSize;
    if (uDisplayMode == 1.0) baseSize *= 0.88; // Crisp metrology wireframe
    float sizeBoost = 1.0 + arc * 0.42 + vScanWave * 0.30;
    float dynamicSize = baseSize * sizeBoost;

    gl_PointSize = clamp((dynamicSize * uPixelRatio) / (-mvPosition.z), 1.5, 54.0);
  }
`;

const ParticleFragmentShader = `
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  uniform vec3 uHighlightStart;
  uniform vec3 uHighlightEnd;
  uniform float uTime;
  uniform float uDisplayMode;

  varying vec3 vWorldPos;
  varying vec3 vViewPos;
  varying vec3 vSurfaceNormal;
  varying float vProgress;
  varying float vSeed;
  varying float vScanWave;
  varying float vDispersion;
  varying float vElevation;
  varying float vMouseDist;

  void main() {
    // 1. Point spherical normal
    vec2 coord = gl_PointCoord * 2.0 - 1.0;
    float r2 = dot(coord, coord);
    if (r2 > 1.0) discard;
    float z = sqrt(1.0 - r2);
    vec3 beadNormal = normalize(vec3(coord.x, -coord.y, z * 1.35));

    // 2. Hybrid Normal: Blends true physical CAD surface normal with micro-bead normal
    // This gives realistic geometry shading across cylinders/flanges while maintaining jewel-like glint
    vec3 macroNormal = normalize(vSurfaceNormal);
    vec3 N = normalize(mix(macroNormal, beadNormal, 0.40));

    // 3. Studio 3-Point HDR Lighting
    vec3 keyLight = normalize(vec3(0.58, 0.76, 0.62));
    vec3 fillLight = normalize(vec3(-0.65, -0.28, 0.42));
    vec3 rimLightDir = normalize(vec3(0.0, -0.85, -0.55));

    float NdotL = max(0.0, dot(N, keyLight));
    float diff = max(0.22, NdotL);
    float fill = max(0.0, dot(N, fillLight)) * 0.36;

    // Specular reflection with high shininess
    vec3 V = vec3(0.0, 0.0, 1.0);
    vec3 H = normalize(keyLight + V);
    float NdotH = max(0.0, dot(N, H));
    float spec = pow(NdotH, 36.0);

    // Fresnel rim reflection (optical edge luster)
    float fresnel = pow(1.0 - z, 2.5);

    // 4. Color Calculation
    float blendT = smoothstep(0.0, 1.0, vProgress);
    vec3 baseAlloy = mix(uColorStart, uColorEnd, blendT);
    vec3 highAlloy = mix(uHighlightStart, uHighlightEnd, blendT);

    vec3 finalColor = vec3(0.0);
    float alpha = 1.0;

    if (uDisplayMode == 1.0) {
      // ════════ MODE 1: CMM LASER X-RAY & METROLOGY WIREFRAME ════════
      // Blueprint cyan, laser emerald, and gold coordinate elevation lines
      float contour = sin(vElevation * 14.0) * 0.5 + 0.5;
      contour = pow(contour, 8.0) * 0.6;

      vec3 cmmCyan = vec3(0.22, 0.78, 0.98);
      vec3 laserGreen = vec3(0.28, 0.95, 0.65);
      vec3 inspectionColor = mix(cmmCyan, laserGreen, vScanWave);

      finalColor = inspectionColor * (diff * 0.6 + 0.4);
      finalColor += vec3(1.0) * (spec * 0.9 + contour);
      finalColor += cmmCyan * (fresnel * 0.5);

      // CMM stylus laser focus near mouse
      if (vMouseDist < 1.8) {
        float laserRing = sin(vMouseDist * 16.0 - uTime * 6.0) * 0.5 + 0.5;
        finalColor += vec3(0.9, 0.8, 0.3) * (laserRing * 0.4);
      }

      alpha = smoothstep(1.0, 0.80, r2) * 0.92;

    } else if (uDisplayMode == 2.0) {
      // ════════ MODE 2: KINETIC FERROFLUID (Molten Gold / Liquid Mercury) ════════
      vec3 goldBase = vec3(0.85, 0.62, 0.18);
      vec3 mercuryCore = vec3(0.95, 0.92, 0.85);

      vec3 deepShadow = goldBase * 0.3;
      finalColor = mix(deepShadow, goldBase, diff + fill);
      finalColor += mercuryCore * (spec * 1.1);
      finalColor += vec3(1.0, 0.85, 0.45) * (fresnel * 0.6);

      // Aerodynamic kinetic wake during flight
      finalColor += vec3(0.4, 0.2, 0.05) * (vDispersion * 0.8);
      alpha = smoothstep(1.0, 0.75, r2) * 0.96;

    } else {
      // ════════ MODE 0: LUXURY METALLURGIC ALLOY (PBR Titanium/Copper/Brass) ════════
      // Deep anisotropic shadow
      vec3 deepShadow = baseAlloy * 0.32;
      vec3 litBody = mix(deepShadow, baseAlloy, diff + fill);

      // Metrology laser scan pulse
      litBody += highAlloy * (vScanWave * 0.70);

      // Specular diamond glint
      litBody += (highAlloy * 0.85 + vec3(0.28)) * (spec * 0.90);

      // Chromatic champagne rim
      litBody += highAlloy * (fresnel * 0.45);

      // Mid-flight thermal plasma warmth
      litBody += vec3(0.32, 0.18, 0.06) * (vDispersion * 0.70);

      // Prismatic dispersion on outer rim
      vec3 chromaticPrism = vec3(
        sin(z * 3.14159) * 0.06,
        0.0,
        cos(z * 3.14159) * 0.06
      );
      litBody += chromaticPrism * fresnel;

      finalColor = litBody;
      alpha = smoothstep(1.0, 0.76, r2) * 0.95;
    }

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export interface MorphConfig {
  pointCount: number;
}

export class GpuParticleMorph {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private pointCount: number;

  constructor(pointCount: number = 120000) {
    this.pointCount = pointCount;
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(pointCount * 3);
    const targetPositions = new Float32Array(pointCount * 3);
    const normals = new Float32Array(pointCount * 3);
    const targetNormals = new Float32Array(pointCount * 3);
    const seeds = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const idx = i * 3;
      seeds[idx] = (Math.random() - 0.5) * 2.0;
      seeds[idx + 1] = (Math.random() - 0.5) * 2.0;
      seeds[idx + 2] = (Math.random() - 0.5) * 2.0;

      // Default normal pointing along Z
      normals[idx + 2] = 1.0;
      targetNormals[idx + 2] = 1.0;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aTargetPos', new THREE.BufferAttribute(targetPositions, 3));
    this.geometry.setAttribute('aNormal', new THREE.BufferAttribute(normals, 3));
    this.geometry.setAttribute('aTargetNormal', new THREE.BufferAttribute(targetNormals, 3));
    this.geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));

    this.material = new THREE.ShaderMaterial({
      vertexShader: ParticleVertexShader,
      fragmentShader: ParticleFragmentShader,
      uniforms: {
        uProgress: { value: 0.0 },
        uTime: { value: 0.0 },
        uPixelRatio: { value: 1.0 },
        uBaseSize: { value: 24.0 },
        uDisplayMode: { value: 0.0 },
        uColorStart: { value: new THREE.Color("#c85a28") },
        uColorEnd: { value: new THREE.Color("#d4af37") },
        uHighlightStart: { value: new THREE.Color("#fed7aa") },
        uHighlightEnd: { value: new THREE.Color("#fef08a") },
        uOffsetStart: { value: new THREE.Vector3() },
        uOffsetEnd: { value: new THREE.Vector3() },
        uModelRotation: { value: new THREE.Vector3() },
        uMouseWorld: { value: new THREE.Vector3(999, 999, 0) },
        uMouseStrength: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
  }

  public setDisplayMode(mode: 0 | 1 | 2) {
    this.material.uniforms.uDisplayMode.value = mode;
  }

  public setColors(
    colorStart: THREE.Color,
    colorEnd: THREE.Color,
    highlightStart?: THREE.Color,
    highlightEnd?: THREE.Color
  ) {
    this.material.uniforms.uColorStart.value.copy(colorStart);
    this.material.uniforms.uColorEnd.value.copy(colorEnd);
    if (highlightStart) {
      this.material.uniforms.uHighlightStart.value.copy(highlightStart);
    }
    if (highlightEnd) {
      this.material.uniforms.uHighlightEnd.value.copy(highlightEnd);
    }
  }

  public setColor(color: THREE.Color) {
    this.material.uniforms.uColorStart.value.copy(color);
    this.material.uniforms.uColorEnd.value.copy(color);
  }

  public setSourceAndTarget(
    sourcePts: Float32Array,
    targetPts: Float32Array,
    sourceNormals: Float32Array,
    targetNormals: Float32Array,
    startOffset: THREE.Vector3,
    endOffset: THREE.Vector3,
    colorA?: THREE.Color,
    colorB?: THREE.Color,
    highlightA?: THREE.Color,
    highlightB?: THREE.Color
  ) {
    const posAttr = this.geometry.attributes.position as THREE.BufferAttribute;
    const targetAttr = this.geometry.attributes.aTargetPos as THREE.BufferAttribute;
    const normAttr = this.geometry.attributes.aNormal as THREE.BufferAttribute;
    const targetNormAttr = this.geometry.attributes.aTargetNormal as THREE.BufferAttribute;

    const sArr = posAttr.array as Float32Array;
    const tArr = targetAttr.array as Float32Array;
    const snArr = normAttr.array as Float32Array;
    const tnArr = targetNormAttr.array as Float32Array;

    // High performance bulk copy
    sArr.set(sourcePts);
    tArr.set(targetPts);
    if (sourceNormals && sourceNormals.length === snArr.length) {
      snArr.set(sourceNormals);
    }
    if (targetNormals && targetNormals.length === tnArr.length) {
      tnArr.set(targetNormals);
    }

    posAttr.needsUpdate = true;
    targetAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
    targetNormAttr.needsUpdate = true;

    this.material.uniforms.uOffsetStart.value.copy(startOffset);
    this.material.uniforms.uOffsetEnd.value.copy(endOffset);

    if (colorA && colorB) {
      this.material.uniforms.uColorStart.value.copy(colorA);
      this.material.uniforms.uColorEnd.value.copy(colorB);
    }
    if (highlightA && highlightB) {
      this.material.uniforms.uHighlightStart.value.copy(highlightA);
      this.material.uniforms.uHighlightEnd.value.copy(highlightB);
    }
  }

  public update(
    progress: number,
    time: number,
    dpr: number,
    rotation: THREE.Vector3,
    mouseWorld?: THREE.Vector3,
    mouseStrength: number = 0.0
  ) {
    this.material.uniforms.uProgress.value = progress;
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uPixelRatio.value = dpr;
    this.material.uniforms.uModelRotation.value.copy(rotation);
    if (mouseWorld) {
      this.material.uniforms.uMouseWorld.value.copy(mouseWorld);
      this.material.uniforms.uMouseStrength.value = mouseStrength;
    }
  }

  public setVisible(visible: boolean) {
    this.points.visible = visible;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
