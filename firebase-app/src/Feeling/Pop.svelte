<script>
  import { onMount } from "svelte";

  import { Engine } from "@babylonjs/core/Engines/Engine";
  import { Scene } from "@babylonjs/core/Scene";

  import { ArcRotateCamera } from "@babylonjs/core/Cameras/ArcRotateCamera";

  import { Vector3 } from "@babylonjs/core/Maths/Math";

  import { PointLight } from "@babylonjs/core/Lights/PointLight";

  import { ParticleSystem } from "@babylonjs/core/Particles/particlesystem";

  import { Mesh } from "@babylonjs/core/Meshes/mesh";

  import { Texture } from "@babylonjs/core/materials/textures";

  import { StandardMaterial } from "@babylonjs/core/materials/StandardMaterial";

  // Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
  import "@babylonjs/core/Meshes/meshBuilder";

  onMount(() => {
    const canvas = document.getElementById("popCanvas");
    const engine = new Engine(canvas);

    let scene = new Scene(engine);

    // Setup environment
    let light0 = new PointLight("Omni", new Vector3(0, 2, 8), scene);
    let camera = new ArcRotateCamera(
      "ArcRotateCamera",
      1,
      0.8,
      20,
      new Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvas, true);

    // Create a particle system
    let particleSystem = new ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new Texture("textures/flare.png", scene);

    // Large spread
    // Where the particles come from
    /* particleSystem.emitter = new Vector3(0, 0, 0); // the starting object, the emitter
     * particleSystem.minEmitBox = new Vector3(-5, -5, -5); // Starting all from
     * particleSystem.maxEmitBox = new Vector3(5, 5, 5); // To...*/

    // Small spread
    // Where the particles come from
    particleSystem.emitter = new Vector3(0, 0, 0); // the starting object, the emitter
    particleSystem.minEmitBox = new Vector3(-0.5, -0.5, -0.5); // Starting all from
    particleSystem.maxEmitBox = new Vector3(0.5, 0.5, 0.5); // To...

    // Render every frame
    engine.runRenderLoop(() => {
      // Start the particle system
      particleSystem.start();

      scene.render();
    });
  });
</script>

<style>
  #popCanvas {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 0;
  }
</style>

<canvas id="popCanvas" touch-action="none" />
