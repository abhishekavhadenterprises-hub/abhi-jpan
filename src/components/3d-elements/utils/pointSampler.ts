import * as THREE from 'three';

export interface SampledPointsData {
  positions: Float32Array;
  normals: Float32Array;
}

/**
 * Samples `count` points and physical surface normals uniformly from all meshes in a THREE.Group
 */
export function samplePointsAndNormalsFromGroup(group: THREE.Group, count: number): SampledPointsData {
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const meshes: THREE.Mesh[] = [];

  group.updateMatrixWorld(true);
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      meshes.push(child as THREE.Mesh);
    }
  });

  if (meshes.length === 0) return { positions, normals };

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();
  const e1 = new THREE.Vector3();
  const e2 = new THREE.Vector3();
  const triNormal = new THREE.Vector3();

  const nA = new THREE.Vector3();
  const nB = new THREE.Vector3();
  const nC = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  interface TriangleData {
    meshIndex: number;
    iA: number;
    iB: number;
    iC: number;
    area: number;
    faceNormal: THREE.Vector3;
  }

  const triangles: TriangleData[] = [];
  let totalArea = 0;

  for (let m = 0; m < meshes.length; m++) {
    const mesh = meshes[m];
    const geom = mesh.geometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    if (!pos) continue;

    const index = geom.index as THREE.BufferAttribute | null;
    const triCount = index ? index.count / 3 : pos.count / 3;

    for (let t = 0; t < triCount; t++) {
      const iA = index ? index.getX(t * 3) : t * 3;
      const iB = index ? index.getX(t * 3 + 1) : t * 3 + 1;
      const iC = index ? index.getX(t * 3 + 2) : t * 3 + 2;

      vA.fromBufferAttribute(pos, iA).applyMatrix4(mesh.matrixWorld);
      vB.fromBufferAttribute(pos, iB).applyMatrix4(mesh.matrixWorld);
      vC.fromBufferAttribute(pos, iC).applyMatrix4(mesh.matrixWorld);

      e1.subVectors(vB, vA);
      e2.subVectors(vC, vA);
      triNormal.crossVectors(e1, e2);
      const len = triNormal.length();
      const area = len * 0.5;

      if (area > 0.000001) {
        const fn = triNormal.clone().multiplyScalar(1.0 / len);
        triangles.push({
          meshIndex: m,
          iA,
          iB,
          iC,
          area,
          faceNormal: fn,
        });
        totalArea += area;
      }
    }
  }

  if (triangles.length === 0 || totalArea === 0) return { positions, normals };

  // Precompute cumulative area distribution for binary search
  const cumulativeAreas = new Float64Array(triangles.length);
  let acc = 0;
  for (let i = 0; i < triangles.length; i++) {
    acc += triangles[i].area / totalArea;
    cumulativeAreas[i] = acc;
  }
  cumulativeAreas[triangles.length - 1] = 1.0;

  const pickTriangle = (val: number): TriangleData => {
    let low = 0;
    let high = cumulativeAreas.length - 1;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (cumulativeAreas[mid] < val) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return triangles[low];
  };

  let pIdx = 0;
  const targetPos = new THREE.Vector3();
  const targetNorm = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    const tri = pickTriangle(Math.random());
    const mesh = meshes[tri.meshIndex];
    const geom = mesh.geometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const normAttr = geom.attributes.normal as THREE.BufferAttribute | undefined;

    vA.fromBufferAttribute(pos, tri.iA).applyMatrix4(mesh.matrixWorld);
    vB.fromBufferAttribute(pos, tri.iB).applyMatrix4(mesh.matrixWorld);
    vC.fromBufferAttribute(pos, tri.iC).applyMatrix4(mesh.matrixWorld);

    let r1 = Math.random();
    let r2 = Math.random();
    if (r1 + r2 > 1.0) {
      r1 = 1.0 - r1;
      r2 = 1.0 - r2;
    }
    const r3 = 1.0 - r1 - r2;

    targetPos.set(0, 0, 0)
      .addScaledVector(vA, r1)
      .addScaledVector(vB, r2)
      .addScaledVector(vC, r3);

    if (normAttr) {
      normalMatrix.getNormalMatrix(mesh.matrixWorld);
      nA.fromBufferAttribute(normAttr, tri.iA).applyMatrix3(normalMatrix);
      nB.fromBufferAttribute(normAttr, tri.iB).applyMatrix3(normalMatrix);
      nC.fromBufferAttribute(normAttr, tri.iC).applyMatrix3(normalMatrix);

      targetNorm.set(0, 0, 0)
        .addScaledVector(nA, r1)
        .addScaledVector(nB, r2)
        .addScaledVector(nC, r3)
        .normalize();
    } else {
      targetNorm.copy(tri.faceNormal);
    }

    const idx = pIdx * 3;
    positions[idx] = targetPos.x;
    positions[idx + 1] = targetPos.y;
    positions[idx + 2] = targetPos.z;

    normals[idx] = targetNorm.x;
    normals[idx + 1] = targetNorm.y;
    normals[idx + 2] = targetNorm.z;

    pIdx++;
  }

  return { positions, normals };
}

/**
 * Backward compatibility wrapper
 */
export function samplePointsFromGroup(group: THREE.Group, count: number): Float32Array {
  return samplePointsAndNormalsFromGroup(group, count).positions;
}
