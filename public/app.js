///<reference path="babylon.d.ts" />
var App = /** @class */ (function () {
    function App(canvasElement) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    App.prototype.createScene = function () {
        // // Create a basic BJS Scene object.
        // this._scene = new BABYLON.Scene(this._engine);
        // // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        // this._camera = new BABYLON.FreeCamera(
        //   "camera1",
        //   new BABYLON.Vector3(0, 5, -10),
        //   this._scene
        // );
        // // Target the camera to scene origin.
        // this._camera.setTarget(BABYLON.Vector3.Zero());
        // // Attach the camera to the canvas.
        // this._camera.attachControl(this._canvas, false);
        // // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        // this._light = new BABYLON.HemisphericLight(
        //   "light1",
        //   new BABYLON.Vector3(0, 1, 0),
        //   this._scene
        // );
        // // Create a built-in "sphere" shape; with 16 segments and diameter of 2.
        // let sphere = BABYLON.MeshBuilder.CreateSphere(
        //   "sphere1",
        //   { segments: 16, diameter: 2 },
        //   this._scene
        // );
        // // Move the sphere upward 1/2 of its height.
        // sphere.position.y = 1;
        // // Create a built-in "ground" shape.
        // let ground = BABYLON.MeshBuilder.CreateGround(
        //   "ground1",
        //   { width: 6, height: 6, subdivisions: 2 },
        //   this._scene
        // );
        this._scene = new BABYLON.Scene(this._engine);
        // Setup environment
        this._light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), this._scene);
        this._camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.attachControl(this._canvas, true);
        // Create a particle system
        this._particleSystem = new BABYLON.ParticleSystem("particles", 2000, this._scene);
        // Texture of each particle
        this._particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", this._scene);
        // Where the particles come from
        this._particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
        this._particleSystem.minEmitBox = new BABYLON.Vector3(-5, -5, -5);
        this._particleSystem.maxEmitBox = new BABYLON.Vector3(5, 5, 5);
    };
    App.prototype.doRender = function () {
        var _this = this;
        // Run the render loop.
        this._engine.runRenderLoop(function () {
            _this._particleSystem.start();
            _this._scene.render();
        });
        // The canvas/window resize event handler.
        window.addEventListener("resize", function () {
            _this._engine.resize();
        });
    };
    return App;
}());
window.addEventListener("DOMContentLoaded", function () {
    // Create the game using the 'renderCanvas'.
    var game = new App("renderCanvas");
    // Create the scene.
    game.createScene();
    // Start render loop.
    game.doRender();
});
