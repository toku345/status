<script>
  import { onMount } from "svelte";

  import { Engine } from "@babylonjs/core/Engines/engine";
  import { Scene } from "@babylonjs/core/scene";

  import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

  import { Vector3, Color3, Color4 } from "@babylonjs/core/Maths/math";

  import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";

  import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
  import { ParticleHelper } from "@babylonjs/core/Particles/particleHelper";

  import { Mesh } from "@babylonjs/core/Meshes/mesh";

  import { Texture } from "@babylonjs/core/Materials/Textures/texture";
  import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";

  import { StandardMaterial } from "@babylonjs/core/materials/StandardMaterial";

  // Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
  import "@babylonjs/core/Meshes/meshBuilder";

  onMount(() => {
    const canvas = document.getElementById("popCanvas");
    const engine = new Engine(canvas);

    let scene = new Scene(engine);

    // Set up environment
    let hdrTexture = CubeTexture.CreateFromPrefilteredData(
      "https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/DDS/Runyon_Canyon_A_2k_cube_specular.dds",
      scene
    );
    hdrTexture.name = "envTex";
    hdrTexture.gammaSpace = false;
    scene.environmentTexture = hdrTexture;

    // Camera
    let camera = new ArcRotateCamera(
      "ArcRotateCamera",
      1,
      1.25,
      50,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    // Analytical Light
    let directionalLight = new DirectionalLight(
      "directional",
      new Vector3(0.5, -2.0, 0.0),
      scene
    );

    // Scene color
    scene.clearColor = new Color3(0.3, 0.3, 0.3);

    // Particle system
    let smokePillar = ParticleHelper.CreateDefault(new Vector3.Zero(), 2000);
    let smokePillarCone = smokePillar.createConeEmitter(0.6, 1);
    smokePillar.emitRate = 20;

    // Size
    smokePillar.addSizeGradient(0.0, 1.0, 2.0);
    smokePillar.addSizeGradient(1.0, 5.0, 8.0);

    // Lifetime
    smokePillar.minLifeTime = 5;
    smokePillar.maxLifeTime = 8;

    // Rotation
    smokePillar.minInitialRotation = -Math.PI / 2;
    smokePillar.maxInitialRotation = Math.PI / 2;

    // Rotation over lifetime
    smokePillar.addAngularSpeedGradient(0, 0);
    smokePillar.addAngularSpeedGradient(1.0, -0.4, 0.4);

    // Color over lifetime
    smokePillar.addColorGradient(
      0.0,
      new Color4(190 / 255, 180 / 255, 180 / 255, 0.0)
    );
    smokePillar.addColorGradient(
      0.2,
      new Color4(190 / 255, 180 / 255, 180 / 255, 128 / 255)
    );
    smokePillar.addColorGradient(
      0.6,
      new Color4(110 / 255, 100 / 255, 100 / 255, 60 / 255)
    );
    smokePillar.addColorGradient(
      1.0,
      new Color4(110 / 255, 100 / 255, 100 / 255, 0.0)
    );

    // Texture
    smokePillar.isAnimationSheetEnabled = true;
    smokePillar.particleTexture = new Texture(
      "https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Explosion/CloudSpriteSheet.png",
      scene
    );
    smokePillar.blendMode = ParticleSystem.BLENDMODE_MULTIPLY;
    smokePillar.spriteCellWidth = 256;
    smokePillar.spriteCellHeight = 256;
    smokePillar.startSpriteCellID = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    smokePillar.endSpriteCellID = smokePillar.startSpriteCellID;
    smokePillar.spriteCellChangeSpeed = 1;

    // Prewarm
    smokePillar.preWarmCycles = 500;

    // Render every frame
    engine.runRenderLoop(() => {
      // Start
      smokePillar.start(30);

      scene.render();
    });
  });
</script>

<style>
  #smokeCanvas {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 0;
  }
</style>

<canvas id="smokeCanvas" touch-action="none" />
