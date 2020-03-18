import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

export const setupThreeAscii = () => {
  var camera, controls, scene, renderer, effect;
  var sphere, plane;
  var start = Date.now();
  const container = document.createElement('div');

  init();
  animate();

  function destroy() {
    scene.dispose();
    renderer.dispose();

    window.removeEventListener('resize', onWindowResize, false);
    document.removeEventListener('keydown', onKeyPressed, false);

    document.body.removeChild(container);
  }

  function init() {
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.y = 150;
    camera.position.z = 500;
    scene = new THREE.Scene();
    var light = new THREE.PointLight(0xffffff);
    light.position.set(500, 500, 500);
    scene.add(light);
    var light2 = new THREE.PointLight(0xffffff, 0.25);
    light2.position.set(-500, -500, -500);
    scene.add(light2);
    sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(200, 20, 10),
      new THREE.MeshPhongMaterial({ flatShading: true })
    );
    scene.add(sphere); // need sphere???

    // Plane
    plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(400, 400),
      new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
    );
    plane.position.y = -200;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = 'white';

    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 2;
    `;

    container.appendChild(effect.domElement);

    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
    document.body.appendChild(container);
    controls = new TrackballControls(camera, effect.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyPressed, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
  }

  function onKeyPressed(event) {
    if (event.key === ' ') {
      destroy();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    var timer = Date.now() - start;
    sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
    sphere.rotation.x = timer * 0.0003;
    sphere.rotation.z = timer * 0.0002;
    controls.update();
    effect.render(scene, camera);
  }

  return () => destroy();
};
