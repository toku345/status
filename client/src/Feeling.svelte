<script>
  import { onMount } from "svelte";

  import { Engine } from "@babylonjs/core/Engines/engine";
  import { Scene } from "@babylonjs/core/scene";
  import { Vector3 } from "@babylonjs/core/Maths/math";

  /* import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";*/
  import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcrotatecamera";

  /* import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";*/
  import { PointLight } from "@babylonjs/core/Lights/pointlight";

  import { Mesh } from "@babylonjs/core/Meshes/mesh";

  import { ParticleSystem } from "@babylonjs/core/particles/particlesystem";
  import { SphereParticleEmitter } from "@babylonjs/core/particles/EmitterTypes/sphereParticleEmitter";

  import { Texture } from "@babylonjs/core/materials/textures";

  import { GridMaterial } from "@babylonjs/materials/grid";

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
    particleSystem.particleTexture = new BABYLON.Texture(
      "/textures/flare.png",
      scene
    );

    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    let emitterType = new SphereParticleEmitterw();
    emitterType.radius = 5;
    emitterType.radiusRange = 0;

    particleSystem.particleEmitterType = emitterType;

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.005;

    particleSystem.addVelocityGradient(0, 3, 5);
    particleSystem.addVelocityGradient(1.0, -5, -10);

    // Start the particle system
    particleSystem.start();

    /* ------------------------- */

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Create a grid material
    var material = new GridMaterial("grid", scene);

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 2;

    // Affect a material
    sphere.material = material;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Affect a material
    ground.material = material;

    // Render every frame
    engine.runRenderLoop(() => {
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
