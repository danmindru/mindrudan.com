import React, { useRef, useEffect, useState } from 'react';

import { version } from '../package.json';
import './App.css';
import { css } from 'emotion';

import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm//postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm//postprocessing/GlitchPass.js';

import 'bashme/dist/xterm.css';
import * as Bashme from 'bashme';
import * as nonWorkingChalk from 'chalk';

const options: any = { enabled: true, level: 2 };
const forcedChalk = new nonWorkingChalk.constructor(options);

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

const menuStyle = css`
  --menu-width: 280px;

  position: absolute;
  transform: translate3d(var(--menu-width), 0, 0);
  z-index: 3;
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  transition: transform 0.8s;
  background-color: rgba(251, 115, 121, 1);
  color: white;
  padding: 32px;
  box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, 0.2);

  ul {
    height: 100%;
    overflow: auto;
    list-style-type: none;
    margin: 0;
    padding: 32px 0;

    li {
      margin: 0;
      padding: 8px 16px;
    }
  }
`;

const menuOpenStyle = css`
  transform: translate3d(0, 0, 0);
  transition: transform 0.8s;
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

const openButtonStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
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
  ],
  [
    `root (hd0,0)
 Filesystem type is ext2fs, partition type 0x83
kernel /vmlinuz-2.6.18.164.11.1.e15 ro root=/dev/VolGroup00/LogVol00 rhgb quiet
   [Linux-bzImage, setup=0x1e00, size=0x1d6b1c]
initrd /initrd-2.6.18-164.11.1.e15.img
   [Linux-initrd @ 0x37cab000, 0x344acb bytes]
`,
    'Memory for crash kernel (0x0 to 0x0) notwithin permissible range',
    forcedChalk.yellow('WARNING calibrate_APIC_clock: the APIC timer calibration may be wrong.'),
    'PCI: PIIX3: Enabling Passive Release on 000:00:01.0',
    'Reading all physical volumes.  This may take a while...',
    'Volume group "VolGroup00" not found',
    'Unable to access resume device (/dev/VolGroup/LogVol01)',
    `mount: could not find filesystem '/dev/root'
setuproot: moving /dev failed: No such file or directory
setuproot: error mounting /proc: No such file or directory
setuproot: error mounting /sys: No such file or directory
switchroot: mount failed: No such file or directory
`,
    forcedChalk.red('Kernel panic - not syncing: Attempt to kill init!')
  ],
  [
    `Unable to handle kernel paging request at virtual address 40025694 pgd = d7138000
[40025694] *pgd=9ec1a831, *pte=bf2e659d, *ppte=00000000
Internal error: Oops: 17 [#1] PREEMPT SMP Modules linked in:
CPU: 1    Not tainted  (3.0.21-g572d9be-00004-g4ec4db2 #1)
PC is at vector_swi+0x28/0x88
LR is at 0x40025698
pc : c01065a8    lr : 40025698    psr : 60000093
sp : d6eaffb0  ip : 4062c18c  fp : 5ed97c24
r10: 58702b64  r9 : 5ea56f98  r8 : 20000010
r7 : 000000a8  r6 : 41b13530  r5 : 4062c270  r4 : 4062c140
r3 : 00000000  r2 : ffffffff  r1 : 00000001  r0 : 5ed97bd0
Flags: nZCv  IRQs off  FIQs on  Mode SVC_32  ISA ARM  Segment user
Control: 10c5787d  Table: 9ec3806a  DAC: 00000015`,
    `Process UEventObserver (pid: 675, stack limit = 0xd6eae2f0)
Stack: (0xd6eaffb0 to 0xd6eb0000)
ffa0:                                     5ed97bd0 00000001 ffffffff 00000000
ffc0: 4062c140 4062c270 41b13530 000000a8 5ed97bd0 5ea56f98 58702b64 5ed97c24
ffe0: 4062c18c 5ed97bc8 406283d7 40025698 20000010 5ed97bd0 a8afc821 a8afcc21
Code: e58d8040 e58d0044 e3180020 13a0a000 (051ea004)`,
    '---[ end trace 2416079997dfe426 ]---',
    forcedChalk.red('Kernel panic - not syncing: Fatal exception'),
    '[<c010cdec>] (unwind_backtrace+0x0/0x12c) from [<c078872c>] (panic+0x80/0x1a4)',
    '[<c078872c>] (panic+0x80/0x1a4) from [<c010a578>] (die+0x1d4/0x21c)',
    '[<c010a578>] (die+0x1d4/0x21c) from [<c0111510>] (__do_kernel_fault+0x64/0x84)',
    '[<c0111510>] (__do_kernel_fault+0x64/0x84) from [<c0111798>] (do_page_fault+0x268/0x288)',
    '[<c0111798>] (do_page_fault+0x268/0x288) from [<c0100340>] (do_DataAbort+0x134/0x1a4)',
    '[<c0100340>] (do_DataAbort+0x134/0x1a4) from [<c010602c>] (__dabt_svc+0x4c/0x60)',
    `Exception stack(0xd6eaff68 to 0xd6eaffb0)
 ff60:                   5ed97bd0 00000001 ffffffff 00000000 4062c140 4062c270
 ff80: 41b13530 000000a8 20000010 5ea56f98 58702b64 5ed97c24 4062c18c d6eaffb0
 ffa0: 40025698 c01065a8 60000093 ffffffff
 [<c010602c>] (__dabt_svc+0x4c/0x60) from [<c01065a8>] (vector_swi+0x28/0x88)
 ${forcedChalk.yellow('CPU0: stopping')}`,
    `[<c010cdec>] (unwind_backtrace+0x0/0x12c) from [<c010b438>] (handle_IPI+0x100/0x1d4)
 [<c010b438>] (handle_IPI+0x100/0x1d4) from [<c010044c>] (gic_handle_irq+0x9c/0xac)
 [<c010044c>] (gic_handle_irq+0x9c/0xac) from [<c0106094>] (__irq_svc+0x54/0x80)
 Exception stack(0xc874bc68 to 0xc874bcb0)
 bc60:                   d3cf4948 cd6dbd54 0000001f 00000000 b1d2a59d 5ea1f000
 bc80: d3cf4948 5ea1f000 00000000 c874a000 d2b9207c d7e55670 5ea1f02b c874bcb0
 bca0: c01eb894 c010bbb4 60000013 ffffffff
 [<c0106094>] (__irq_svc+0x54/0x80) from [<c010bbb4>] (flush_tlb_page+0x8c/0x98)
 [<c010bbb4>] (flush_tlb_page+0x8c/0x98) from [<c01eb894>] (ptep_clear_flush+0x30/0x38)
 [<c01eb894>] (ptep_clear_flush+0x30/0x38) from [<c01e743c>] (try_to_unmap_one+0xc4/0x3a4)
 [<c01e743c>] (try_to_unmap_one+0xc4/0x3a4) from [<c01e77a0>] (try_to_unmap_file+0x84/0x4b4)
 [<c01e77a0>] (try_to_unmap_file+0x84/0x4b4) from [<c01e80b0>] (try_to_unmap+0x34/0x4c)
 [<c01e80b0>] (try_to_unmap+0x34/0x4c) from [<c01d28dc>] (shrink_page_list+0x258/0x78c)
 [<c01d28dc>] (shrink_page_list+0x258/0x78c) from [<c01d31b4>] (shrink_inactive_list+0x1e0/0x330)
 [<c01d31b4>] (shrink_inactive_list+0x1e0/0x330) from [<c01d3704>] (shrink_zone+0x400/0x588)
 [<c01d3704>] (shrink_zone+0x400/0x588) from [<c01d3fd8>] (kswapd+0x594/0x970)
 [<c01d3fd8>] (kswapd+0x594/0x970) from [<c018e04c>] (kthread+0x80/0x88)
 [<c018e04c>] (kthread+0x80/0x88) from [<c01075c0>] (kernel_thread_exit+0x0/0x8)`
    // TODO: hmmm => 'Rebooting in 1 seconds.. Thanks
  ]
];

function App() {
  const terminalDom = useRef(null);
  const [open, setOpen] = useState(false);

  // todo: hook & state
  const setupThreeGlitch = (text) => {
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
        geometry = new THREE.TextGeometry('System memory corruption \n\rRebooting in 10 seconds...', {
          font: font,
          size: 20,
          height: 1,
          curveSegments: 2,
          bevelEnabled: false,
          bevelThickness: 2,
          bevelSize: 2,
          bevelOffset: 0,
          bevelSegments: 1
        });

        material = new THREE.LineBasicMaterial({ color: 0xffffff });
        mesh = new THREE.Mesh(geometry, material);
        object.add(mesh);

        setTimeout(() => {
          geometry.dispose();
          material.dispose();
          console.log(composer);
          scene.dispose();
          renderer.dispose();

          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', onWindowResize, false);

          document.body.removeChild(container);
        }, 1000);
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
  };

  // todo: hook & state
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
      scene.add(sphere); // TODO need sphere???
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

  const onTerminalPress = () => {
    if (open) {
      setOpen(false);
    }
  }

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

    const delay = 100000;
    setTimeout(() => {
      renderKernelPanic(kernelPanics[Math.floor(Math.random() * kernelPanics.length)], bashme).then(() => {
        setupThreeGlitch();
      });
    }, 2000 + delay);

    setTimeout(() => {
      setupThreeAscii();
    }, 5000 + delay);
  }, []);

  return (
    <section className={mainStyle}>
      <main ref={terminalDom} className={[terminalStyle, open ? terminalOpenStyle : ''].join(' ')} onClick={onTerminalPress}/>

      <button className={openButtonStyle} onClick={() => setOpen(!open)}>
        Open
      </button>

      <nav className={[menuStyle, open ? menuOpenStyle : ''].join(' ')}>
        <ul>
          <li>About</li>
          <li>Projects</li>
          <li>Screensaver</li>
          <li>Github</li>
        </ul>
      </nav>
    </section>
  );
}

export default App;
