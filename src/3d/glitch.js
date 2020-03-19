import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm//postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm//postprocessing/GlitchPass.js';

export const setupThreeGlitch = (text, clearAfter = 1000) => {
  var animationFrameId;

  var camera, scene, renderer, composer;
  var object, light;
  var glitchPass;
  var geometry,
    material,
    mesh,
    container = document.createElement('div');
  init();
  animate();


  // function updateOptions() {
  //   var wildGlitch = document.getElementById('wildGlitch');
  //   glitchPass.goWild = wildGlitch.checked;
  // }

  function destroy () {
     geometry.dispose();
     material.dispose();
     console.log(composer);
     scene.dispose();
     renderer.dispose();

     cancelAnimationFrame(animationFrameId);
     window.removeEventListener('resize', onWindowResize, false);

     document.body.removeChild(container);
  }

  function init() {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      z-index: 2;
    `;

    container.appendChild(renderer.domElement);

    // Special case: append effect.domElement, instead of renderer.domElement.
    // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0x000000, 1, 1000);
    object = new THREE.Object3D();
    scene.add(object);

    var loader = new THREE.FontLoader();

    loader.load(`${process.env.PUBLIC_URL}/helvetiker_regular.typeface.json`, function(font) {
      geometry = new THREE.TextGeometry(
        'System memory corruption \n\rKernel panic - not syncing: kernel stack overflow...',
        {
          font: font,
          size: 20,
          height: 1,
          curveSegments: 2,
          bevelEnabled: false,
          bevelThickness: 2,
          bevelSize: 2,
          bevelOffset: 0,
          bevelSegments: 1
        }
      );

      material = new THREE.LineBasicMaterial({ color: 0xffffff });
      mesh = new THREE.Mesh(geometry, material);
      object.add(mesh);

      // clear self after the provided time
      setTimeout(destroy, clearAfter);
    });
    // for (var i = 0; i < 2; i++) {
    //   var material = new THREE.MeshPhongMaterial({ /*color: 0xffffff * Math.random(), */flatShading: true });
    //   var mesh = new THREE.Mesh(geometry, material);
    //   mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    //   mesh.position.multiplyScalar(Math.random() * 400);
    //   mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    //   mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
    //   object.add(mesh);
    // }
    scene.add(new THREE.AmbientLight(0x222222));
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    // postprocessing
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    glitchPass = new GlitchPass();
    composer.addPass(glitchPass);
    //
    window.addEventListener('resize', onWindowResize, false);
    // var wildGlitchOption = document.getElementById('wildGlitch');
    // wildGlitchOption.addEventListener('change', updateOptions);
    // updateOptions();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    object.rotation.x += 0.005;
    object.rotation.y += 0.001;
    composer.render();
  }

  return () => destroy()
};
