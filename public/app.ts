///<reference path="babylon.d.ts" />

class App {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.ArcRotateCamera;
  private _light0: BABYLON.PointLight;
  private _particleSystem: BABYLON.ParticleSystem;

  constructor(canvasElement: string) {
    // Create canvas and engine.
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    // Setup environment
    this._light0 = new BABYLON.PointLight(
      "Omni",
      new BABYLON.Vector3(0, 2, 8),
      this._scene
    );
    this._camera = new BABYLON.ArcRotateCamera(
      "ArcRotateCamera",
      1,
      0.8,
      20,
      new BABYLON.Vector3(0, 0, 0),
      this._scene
    );
    this._camera.attachControl(this._canvas, true);

    // Create a particle system
    this._particleSystem = new BABYLON.ParticleSystem(
      "particles",
      2000,
      this._scene
    );

    // Texture of each particle
    this._particleSystem.particleTexture = new BABYLON.Texture(
      "textures/flare.png",
      this._scene
    );

    // Where the particles come from
    this._particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
    this._particleSystem.minEmitBox = new BABYLON.Vector3(-5, -5, -5);
    this._particleSystem.maxEmitBox = new BABYLON.Vector3(5, 5, 5);
  }

  doRender(): void {
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._particleSystem.start();
      this._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Create the game using the 'renderCanvas'.
  let game = new App("renderCanvas");

  // Create the scene.
  game.createScene();

  // Start render loop.
  game.doRender();
});
