<script>
  import { onMount } from "svelte";

  import { Engine } from "@babylonjs/core/Engines/engine";
  import { Scene } from "@babylonjs/core/scene";
  import { Vector3, Color4 } from "@babylonjs/core/Maths/math";

  import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcrotatecamera";

  import { PointLight } from "@babylonjs/core/Lights/pointlight";

  import { ParticleSystem } from "@babylonjs/core/Particles/particlesystem";
  import { SphereParticleEmitter } from "@babylonjs/core/Particles/EmitterTypes/sphereParticleEmitter";

  import { Mesh } from "@babylonjs/core/Meshes/mesh";

  import { Texture } from "@babylonjs/core/materials/textures";
  import { GridMaterial } from "@babylonjs/materials/grid";
  import { StandardMaterial } from "@babylonjs/materials";

  // Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
  import "@babylonjs/core/Meshes/meshBuilder";

  onMount(() => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new Engine(canvas);

    let scene = new Scene(engine);

    let light0 = new PointLight("Omni", new Vector3(0, 2, 8), scene);
    let camera = new ArcRotateCamera(
      "ArcRotateCamera",
      1,
      0.8,
      20,
      new Vector3(0, 0, 0),
      scene
    );

    // Fountain object
    let fountain = Mesh.CreateBox("foutain", 0.01, scene);

    // Create a particle system
    let particleSystem = new ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new Texture("/textures/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    let emitterType = new SphereParticleEmitter();
    emitterType.radius = 5;
    emitterType.radiusRange = 0;

    particleSystem.particleEmitterType = emitterType;

    // Colors of all particles
    particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new Vector3(0, 0, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.005;

    particleSystem.addVelocityGradient(0, 3, 5);
    particleSystem.addVelocityGradient(1.0, -5, -10);

    // Render every frame
    engine.runRenderLoop(() => {
      // Start the particle system
      particleSystem.start();
      scene.render();
    });
  });
</script>

<style>
  .whoami {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 0;
  }
</style>

<div class="whoami">
  <canvas id="renderCanvas" touch-action="none" />
</div>
