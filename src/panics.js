import { forcedChalk} from './forcedChalk'

export const kernelPanics = [
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
