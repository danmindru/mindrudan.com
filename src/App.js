import React, { useRef, useEffect } from 'react';

import { version } from '../package.json';
import './App.css';

import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import 'bashme/dist/xterm.css';
import * as Bashme from 'bashme';
import chalk from 'chalk';

const options: any = { enabled: true, level: 2 };
const forcedChalk = new chalk.constructor(options);

const terminalStyle = {
  height: '100vh',
  width: '100vw',
  backgroundColor: 'black'
};
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
    name: 'projects',
    description: 'lists projects over the years',
    run: makeCommand('projects'),
    options: () => ['-year', '--y']
  },
  {
    name: 'about',
    description: "some notes about me, so you don't have to google",
    run: () => "Actually, there isn't much on google"
  }
];

const renderKernelPanic = (kernelPanic, bashmeInstance) =>
  kernelPanic
    .reduce(
      (acc, cur) =>
        acc.then(
          () =>
            new Promise((resolve) =>
              setTimeout(() => resolve(bashmeInstance.cli.write(cur + EOL)), Math.random() * 200 + 50)
            )
        ),
      Promise.resolve(bashmeInstance.cli.write(EOL))
    )
    .then(() => {
      bashmeInstance.cli.prompt();
    });
const renderCommand = ({ name, description }) => `${forcedChalk.bold(name.padStart(10).padEnd(13))} ${description}`;

const kernelPanics = [
  [
    'Kernel command line: console=ttyUL0 root=/dev/ram',
    'NR_IRQS:512',
    'Xilinx intc at 0x81800000 mapped to 0xfddff000',
    'PID hash table entries: 4096 (order: 12, 16384 bytes)',
    'clocksource: timebase mult[d55555] shift[22] registered',
    'Console: colour dummy device 80x25',
    'console [ttyUL0] enabled',
    'Dentry cache hash table entries: 131072 (order: 7, 524288 bytes)',
    'Inode-cache hash table entries: 65536 (order: 6, 262144 bytes)',
    'Memory: 774144k/786432k available (3272k kernel code, 12016k reserved, 136k data, 135k bss, 164k init)',
    `Kernel virtual memory layout:
* 0xffffe000..0xfffff000  : fixmap
* 0xfde00000..0xfe000000  : consistent mem
* 0xfddfe000..0xfde00000  : early ioremap
* 0xf1000000..0xfddfe000  : vmalloc & ioremap`,
    'Calibrating delay loop... 598.01 BogoMIPS (lpj=1196032)',
    'Mount-cache hash table entries: 512',
    forcedChalk.redBright('Kernel stack overflow in process ef821490, r1=c002cb1c'),
    `**bleep**: ef825f90 LR: ef825fc0 CTR: ef821490
REGS: ef825f00 TRAP: ef825fc0   Not tainted  (2.6.30)
MSR: c027c048 <EE,PR,CE>  CR: 00029030  XER: c002f220
TASK = ef821490[2] "kthreadd" THREAD: ef824000
GPR00: ef825f10 c002cb1c ef821490 ef8218d0 ef825f30 c0007690 ef821490 ef824000
GPR08: c0335be8 c0334318 ef821490 ef8218a0 ef825f70 c027bdd4 00000000 00021030
GPR16: 10624dd3 00044b83 00000001 c035a048 000000d5 0099f000 00000000 c035b538
GPR24: 00000078 fffffffb c0335be8 ef824000 ef825f80 c027bf68 c0335be8 ef824000`,
    '**bleep** [ef825f90] 0xef825f90',
    'LR [ef825fc0] 0xef825fc0',
    'Call Trace:',
    forcedChalk.redBright('Kernel panic - not syncing: kernel stack overflow')
  ]
];

function App() {
  const terminalDom = useRef(null);

  const setupThreeAscii = () => {
    var camera, controls, scene, renderer, effect;
    var sphere, plane;
    var start = Date.now();
    init();
    animate();
    function init() {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
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
      scene.add(sphere);
      // Plane
      plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(400, 400), new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }));
      plane.position.y = -200;
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
      effect.setSize(window.innerWidth, window.innerHeight);
      effect.domElement.style.color = 'white';

      const container = document.createElement('div');
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
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      effect.setSize(window.innerWidth, window.innerHeight);
    }
    //
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

    setTimeout(() => {
      renderKernelPanic(kernelPanics[0], bashme).then(() => setupThreeAscii());
    }, 2000);
  });

  return <div ref={terminalDom} style={terminalStyle} />;
}

export default App;
