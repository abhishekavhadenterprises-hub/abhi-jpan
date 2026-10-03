import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';

// Display-Space Film Grain Shader (Evaluated strictly post-tone map)
const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0.0 },
    uIntensity: { value: 0.038 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    varying vec2 vUv;

    // High frequency pseudorandom noise
    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);
      // Film grain in display space
      float noise = (rand(vUv * 800.0 + fract(uTime * 17.0)) - 0.5) * uIntensity;
      col.rgb += noise;
      gl_FragColor = col;
    }
  `
};

export class PostProcessing {
  public composer: EffectComposer;
  private bloomPass: UnrealBloomPass;
  private vignettePass: ShaderPass;
  private outputPass: OutputPass;
  private grainPass: ShaderPass;

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.composer = new EffectComposer(renderer);

    // 1. Scene RenderPass
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    // 2. UnrealBloomPass: strength 0.55, radius 0.45, threshold 1.15, smoothWidth 0.35
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.55, // strength
      0.45, // radius
      1.15  // threshold
    );
    // Explicitly configure smoothWidth to 0.35 to prevent harsh silhouette cutout clipping
    if (this.bloomPass.highPassUniforms) {
      const uniforms = this.bloomPass.highPassUniforms as Record<string, { value: number }>;
      if (uniforms.smoothWidth) {
        uniforms.smoothWidth.value = 0.35;
      }
    }
    this.composer.addPass(this.bloomPass);

    // 3. VignetteShader: darkness strictly 1.0 (never above to prevent ACES negative green flare!)
    // Shape falloff with offset 1.3
    this.vignettePass = new ShaderPass(VignetteShader);
    this.vignettePass.uniforms.darkness.value = 1.0;
    this.vignettePass.uniforms.offset.value = 1.3;
    this.composer.addPass(this.vignettePass);

    // 4. OutputPass (ACES Filmic Tone Mapping linear-to-sRGB)
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);

    // 5. Film Grain: Applied in display space AFTER OutputPass
    this.grainPass = new ShaderPass(FilmGrainShader);
    this.composer.addPass(this.grainPass);
  }

  public setSize(width: number, height: number) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }

  public render(sp: number) {
    // Grain time increment is a pure function of sp to remain completely deterministic
    this.grainPass.uniforms.uTime.value = sp * 24.0;
    this.composer.render();
  }

  public dispose() {
    this.composer.passes.forEach((p) => {
      if ('dispose' in p && typeof (p as { dispose: () => void }).dispose === 'function') {
        (p as { dispose: () => void }).dispose();
      }
    });
  }
}
