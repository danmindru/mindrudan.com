import React, { useRef, useEffect, useState } from 'react';

import './App.css';
import { version } from '../package.json';
import { css } from 'emotion';
import { stripIndents } from 'common-tags';

import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm//postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm//postprocessing/GlitchPass.js';

import 'bashme/dist/xterm.css';
import * as Bashme from 'bashme';

import { forcedChalk } from './forcedChalk';
import { kernelPanics } from './panics';
import { Menu } from './Menu';

const mainStyle = css`
  --terminal-padding: 16px;
  background-color: #444;
  perspective: 1500px;

  position: relative;
  overflow: hidden;

  .terminal {
    width: calc(100vw - var(--terminal-padding) * 4);
    height: calc(100vh - var(--terminal-padding) * 2);
    padding: var(--terminal-padding) calc(var(--terminal-padding) * 2);
  }
`;

const terminalStyle = css`
  transform-style: preserve-3d;
  transition: transform 0.5s;

  position: relative;
  left: 0;
  z-index: 1;
  height: 100%;

  :after {
    content: '';
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background-color: transparent;
    transition: background-color 1s;
  }
`;

const terminalOpenStyle = css`
  transform: translate3d(50px, 0, -300px) rotateY(10deg);
  perspective: 1000px;
  transition: transform 0.5s;

  :after {
    background-color: rgba(251, 115, 121, 0.2);
    transition: background-color 1s;
  }
`;

const EOL = '\r\n';
const makeCommand = (command) => (args): Promise<any> => {
  // send a command
  console.log('commands args', args);

  return new Promise((resolve, reject) => {
    const cmd = `${command} ${args._.join(' ')} ${Object.keys(args)
      .filter((key) => key !== '_')
      .map((key) => `${key}=${args[key]}`)}`;

    console.log('command to send', cmd);

    resolve(cmd);
  });
};

const commands = [
  {
    name: 'whoami',
    description: "a bit about me, so you don't have to google",
    run: () => stripIndents`
      --

      I am web developer and designer, located in Copenhagen.
      For more than a decade now, I've been passionate about front-end development and interaction design.

      Since as long as I can remember, I've been helping people start projects and get their ideas moving. That includes helping myself start a company and quite a few projects within it.

      --
    `
  },
  {
    name: 'work',
    description: `what I was up to over the years`,
    run: makeCommand('projects'),
    options: () => ['-year', '--y']
  }
];

// const renderKernelPanic = (kernelPanic, bashmeInstance) =>
//   kernelPanic
//     .reduce(
//       (acc, cur) =>
//         acc.then(
//           () =>
//             new Promise((resolve) =>
//               setTimeout(() => resolve(bashmeInstance.cli.write(cur + EOL)), Math.random() * 200 + 50)
//             )
//         ),
//       Promise.resolve(bashmeInstance.cli.write(EOL))
//     )
//     .then(() => {
//       bashmeInstance.cli.prompt();
//     });

const makeRunCommand = (bashmeInstance) => (commandName) => {
  bashmeInstance.cli.input(`${commandName}${EOL}`);
  bashmeInstance.cli.processInput();
};

const renderCommand = ({ name, description }) => `${forcedChalk.bold(name.padStart(10).padEnd(13))} ${description}`;

export const App = () => {
  const terminalDom = useRef(null);
  const [open, setOpen] = useState(false);
  const [bashmeInstance, setBashmeInstance] = useState(null);

  // // todo: hook & state
  // const setupThreeGlitch = (text) => {
  //   var animationFrameId;

  //   var camera, scene, renderer, composer;
  //   var object, light;
  //   var glitchPass;
  //   var geometry,
  //     material,
  //     mesh,
  //     container = document.createElement('div');
  //   init();
  //   animate();
  //   // function updateOptions() {
  //   //   var wildGlitch = document.getElementById('wildGlitch');
  //   //   glitchPass.goWild = wildGlitch.checked;
  //   // }
  //   function init() {
  //     renderer = new THREE.WebGLRenderer({ alpha: true });
  //     renderer.setPixelRatio(window.devicePixelRatio);
  //     renderer.setSize(window.innerWidth, window.innerHeight);

  //     container.style.cssText = `
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //       height: 100vh;
  //       width: 100vw;
  //       z-index: 2;
  //     `;

  //     container.appendChild(renderer.domElement);

  //     // Special case: append effect.domElement, instead of renderer.domElement.
  //     // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
  //     document.body.appendChild(container);

  //     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  //     camera.position.z = 400;
  //     scene = new THREE.Scene();
  //     // scene.fog = new THREE.Fog(0x000000, 1, 1000);
  //     object = new THREE.Object3D();
  //     scene.add(object);

  //     var loader = new THREE.FontLoader();

  //     loader.load(`${process.env.PUBLIC_URL}/helvetiker_regular.typeface.json`, function(font) {
  //       geometry = new THREE.TextGeometry('System memory corruption \n\rRebooting in 10 seconds...', {
  //         font: font,
  //         size: 20,
  //         height: 1,
  //         curveSegments: 2,
  //         bevelEnabled: false,
  //         bevelThickness: 2,
  //         bevelSize: 2,
  //         bevelOffset: 0,
  //         bevelSegments: 1
  //       });

  //       material = new THREE.LineBasicMaterial({ color: 0xffffff });
  //       mesh = new THREE.Mesh(geometry, material);
  //       object.add(mesh);

  //       setTimeout(() => {
  //         geometry.dispose();
  //         material.dispose();
  //         console.log(composer);
  //         scene.dispose();
  //         renderer.dispose();

  //         cancelAnimationFrame(animationFrameId);
  //         window.removeEventListener('resize', onWindowResize, false);

  //         document.body.removeChild(container);
  //       }, 1000);
  //     });
  //     // for (var i = 0; i < 2; i++) {
  //     //   var material = new THREE.MeshPhongMaterial({ /*color: 0xffffff * Math.random(), */flatShading: true });
  //     //   var mesh = new THREE.Mesh(geometry, material);
  //     //   mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  //     //   mesh.position.multiplyScalar(Math.random() * 400);
  //     //   mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  //     //   mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
  //     //   object.add(mesh);
  //     // }
  //     scene.add(new THREE.AmbientLight(0x222222));
  //     light = new THREE.DirectionalLight(0xffffff);
  //     light.position.set(1, 1, 1);
  //     scene.add(light);
  //     // postprocessing
  //     composer = new EffectComposer(renderer);
  //     composer.addPass(new RenderPass(scene, camera));
  //     glitchPass = new GlitchPass();
  //     composer.addPass(glitchPass);
  //     //
  //     window.addEventListener('resize', onWindowResize, false);
  //     // var wildGlitchOption = document.getElementById('wildGlitch');
  //     // wildGlitchOption.addEventListener('change', updateOptions);
  //     // updateOptions();
  //   }

  //   function onWindowResize() {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     composer.setSize(window.innerWidth, window.innerHeight);
  //   }
  //   function animate() {
  //     animationFrameId = requestAnimationFrame(animate);
  //     object.rotation.x += 0.005;
  //     object.rotation.y += 0.001;
  //     composer.render();
  //   }
  // };

  // // todo: hook & state
  // const setupThreeAscii = () => {
  //   var camera, controls, scene, renderer, effect;
  //   var sphere, plane;
  //   var start = Date.now();
  //   init();
  //   animate();
  //   function init() {
  //     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  //     camera.position.y = 150;
  //     camera.position.z = 500;
  //     scene = new THREE.Scene();
  //     var light = new THREE.PointLight(0xffffff);
  //     light.position.set(500, 500, 500);
  //     scene.add(light);
  //     var light2 = new THREE.PointLight(0xffffff, 0.25);
  //     light2.position.set(-500, -500, -500);
  //     scene.add(light2);
  //     sphere = new THREE.Mesh(
  //       new THREE.SphereBufferGeometry(200, 20, 10),
  //       new THREE.MeshPhongMaterial({ flatShading: true })
  //     );
  //     scene.add(sphere); // TODO need sphere???
  //     // Plane
  //     plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(400, 400), new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }));
  //     plane.position.y = -200;
  //     plane.rotation.x = -Math.PI / 2;
  //     scene.add(plane);
  //     renderer = new THREE.WebGLRenderer();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
  //     effect.setSize(window.innerWidth, window.innerHeight);
  //     effect.domElement.style.color = 'white';

  //     const container = document.createElement('div');
  //     container.style.cssText = `
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //       height: 100vh;
  //       width: 100vw;
  //       z-index: 2;
  //     `;

  //     container.appendChild(effect.domElement);

  //     // Special case: append effect.domElement, instead of renderer.domElement.
  //     // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
  //     document.body.appendChild(container);
  //     controls = new TrackballControls(camera, effect.domElement);
  //     //
  //     window.addEventListener('resize', onWindowResize, false);
  //   }
  //   function onWindowResize() {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     effect.setSize(window.innerWidth, window.innerHeight);
  //   }
  //   //
  //   function animate() {
  //     requestAnimationFrame(animate);
  //     render();
  //   }
  //   function render() {
  //     var timer = Date.now() - start;
  //     sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
  //     sphere.rotation.x = timer * 0.0003;
  //     sphere.rotation.z = timer * 0.0002;
  //     controls.update();
  //     effect.render(scene, camera);
  //   }
  // };

  const onTerminalPress = () => {
    if (open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const customProvider = {
      getCommands: () => [
        {
          name: 'noop',
          run: () => ['']
        },
        {
          name: 'man',
          description: 'List available commands and their description.',
          run: (args) => {
            // if (Object.keys(args).length) {
            //   // TODO
            // }

            const cmds = [forcedChalk.gray('Available commands:'), ...commands.map(renderCommand)].join(EOL);
            console.log(cmds);
            return cmds;
          }
        },
        ...commands
      ]
    };

    const welcomeMessage = `\nWelcome to mindrudan.com version ${version}  🎩 ✨ \nType man or man <command> to see notes on usage.`;

    const bashme = new Bashme.Bashme({
      prompt: forcedChalk.grey('mindrudan.com $ '),
      welcomeMessage
    });
    bashme.use(customProvider);

    bashme.show(terminalDom.current);
    bashme.on('command', (cmd, args) => console.log(cmd, args));

    setBashmeInstance(bashme);

    // const delay = 100000;
    // setTimeout(() => {
    //   renderKernelPanic(kernelPanics[Math.floor(Math.random() * kernelPanics.length)], bashme).then(() => {
    //     setupThreeGlitch();
    //   });
    // }, 2000 + delay);

    // setTimeout(() => {
    //   setupThreeAscii();
    // }, 5000 + delay);
  }, []);

  return (
    <section className={mainStyle}>
      <main
        ref={terminalDom}
        className={[terminalStyle, open ? terminalOpenStyle : ''].join(' ')}
        onClick={onTerminalPress}
      />

      {bashmeInstance && <Menu open={open} setOpen={setOpen} runCommand={makeRunCommand(bashmeInstance)} />}
    </section>
  );
};
