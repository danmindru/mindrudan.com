import { forcedChalk } from '../utils/forcedChalk';

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
    forcedChalk.redBright(
      'Kernel stack overflow in process ef821490, r1=c002cb1c'
    ),
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
   [Linux-initrd @ 0x37cab000, 0x344acb bytes]`,
    'Memory for crash kernel (0x0 to 0x0) notwithin permissible range',
    forcedChalk.yellow(
      'WARNING calibrate_APIC_clock: the APIC timer calibration may be wrong.'
    ),
    'PCI: PIIX3: Enabling Passive Release on 000:00:01.0',
    'Reading all physical volumes.  This may take a while...',
    'Volume group "VolGroup00" not found',
    'Unable to access resume device (/dev/VolGroup/LogVol01)',
    `mount: could not find filesystem '/dev/root'
setuproot: moving /dev failed: No such file or directory
setuproot: error mounting /proc: No such file or directory
setuproot: error mounting /sys: No such file or directory
switchroot: mount failed: No such file or directory`,
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
  ],
  [
    `[Hardware Error]: CPU 4: Machine Check Exception: 5 Bank 3: be00000000800400`,
    `[Hardware Error]: RIP !INEXACT! 33:<00007fe99ae93e54> `,
    `[Hardware Error]: TSC 539b174dead ADDR 3fe98d264ebd MISC 1 `,
    `[Hardware Error]: PROCESSOR 0:206a7 TIME 1357862746 SOCKET 0 APIC 1 microcode 28`,
    `[Hardware Error]: Run the above through 'mcelog --ascii'`,
    `[Hardware Error]: CPU 0: Machine Check Exception: 4 Bank 3: be00000000800400`,
    `[Hardware Error]: TSC 539b174de9d ADDR 3fe98d264ebd MISC 1 `,
    `[Hardware Error]: PROCESSOR 0:206a7 TIME 1357862746 SOCKET 0 APIC 0 microcode 28`,
    `[Hardware Error]: Run the above through 'mcelog --ascii'`,
    `[Hardware Error]: Machine check: Processor context corrupt`,
    forcedChalk.red('Kernel panic - not syncing: Fatal Machine check'),
    `Pid: 0, comm: swapper/5 Tainted: P   M     C O 3.2.0-35-generic #55-Ubuntu`,
    `Call Trace:
   <#MC>  [<ffffffff81644340>] panic+0x91/0x1a4
   [<ffffffff8102abeb>] mce_panic.part.14+0x18b/0x1c0
   [<ffffffff8102ac80>] mce_panic+0x60/0xb0
   [<ffffffff8102aec4>] mce_reign+0x1f4/0x200
   [<ffffffff8102b175>] mce_end+0xf5/0x100
   [<ffffffff8102b92c>] do_machine_check+0x3fc/0x600
   [<ffffffff8136d48f>] ? intel_idle+0xbf/0x150
   [<ffffffff8165d78c>] machine_check+0x1c/0x30
   [<ffffffff8136d48f>] ? intel_idle+0xbf/0x150
   <<EOE>>  [<ffffffff81509697>] ? menu_select+0xe7/0x2c0
   [<ffffffff815082d1>] cpuidle_idle_call+0xc1/0x280
   [<ffffffff8101322a>] cpu_idle+0xca/0x120
   [<ffffffff8163aa9a>] start_secondary+0xd9/0xdb`
  ],
  [
    `NFS client kernel crash because async task already queued hitting BUG_ON(RPC_IS_QUEUED(task)); in __rpc_execute`,
    forcedChalk.red(`kernel BUG at net/sunrpc/sched.c:616!`),
    `invalid opcode: 0000 [#1] SMP`,
    `last sysfs file: /sys/devices/system/cpu/cpu15/cache/index2/shared_cpu_map`,
    `CPU 8`,
    `Modules linked in: nfs lockd fscache nfs_acl auth_rpcgss pcc_cpufreq sunrpc power_meter hpilo
hpwdt igb mlx4_ib(U) mlx4_en(U) raid0 mlx4_core(U) sg microcode serio_raw iTCO_wdt
iTCO_vendor_support ioatdma dca shpchp ext4 mbcache jbd2 raid1 sd_mod crc_t10dif mpt2sas
scsi_transport_sas raid_class ahci dm_mirror dm_region_hash dm_log dm_mod
[last unloaded: scsi_wait_scan]`,
    `Pid: 2256, comm: rpciod/8 Not tainted 2.6.32-220.el6.x86_64 #1 HP ProLiant SL250s Gen8/`,
    forcedChalk.yellow(
      `RIP: 0010:[<ffffffffa01fe458>] [<ffffffffa01fe458>] __rpc_execute+0x278/0x2a0`
    ),
    `Process rpciod/8 (pid: 2256, threadinfo ffff882016152000, task ffff8820162e80c0)`,
    `Call Trace:
[<ffffffffa01fe4d0>] ? rpc_async_schedule+0x0/0x20
[<ffffffffa01fe4e5>] rpc_async_schedule+0x15/0x20
[<ffffffff8108b2b0>] worker_thread+0x170/0x2a0
[<ffffffff81090bf0>] ? autoremove_wake_function+0x0/0x40
[<ffffffff8108b140>] ? worker_thread+0x0/0x2a0
[<ffffffff81090886>] kthread+0x96/0xa0
[<ffffffff8100c14a>] child_rip+0xa/0x20
Code: db df 2e e1 f6 05 e0 26 02 00 40 0f 84 48 fe ff ff 0f b7 b3 d4 00 00 00 48 c7
c7 94 39 21 a0 31 c0 e8 b9 df 2e e1 e9 2e fe ff ff <0f> 0b eb fe 0f b7 b7 d4 00 00 00
31 c0 48 c7 c7 60 63 21 a0 e8`,
    forcedChalk.yellow(`RIP [<ffffffffa01fe458>] __rpc_execute+0x278/0x2a0`)
  ],
  [
    `general protection fault: 0000 [#1] SMP PTI`,
    `CPU: 0 PID: 444 Comm: xfsaild/dm-0 Tainted: GOE     4.18.16-200.fc28.x86_64 #1`,
    `Hardware name: QEMU Standard PC (Q35 + ICH9, 2009), BIOS ?-20180531_142017-buildhw-08.phx2.fedoraproject.org-1.fc28 04/01/2019`,
    forcedChalk.yellow(`RIP: 0010:tracing_mrf+0x164/0x600 [dattobd]`),
    `Code: d8 48 c1 e0 04 4c 01 c8 8b 78 08 48 8b 08 89 f8 29 f0 39 d8 0f 47 c3 48 85 c9 74 7e 48 8b 49 18 48 85 c9 74 75 f6 c1 01 75 70 <48> 8b 09 49 39 cd 0f 85 8f 02 00 00 41 8b 4e 10 44 0f b6 c1 41 83`,
    forcedChalk.red('Kernel panic - not syncing: Fatal exception'),
    `RSP: 0018:ffffb186c0557be0 EFLAGS: 00010246
RAX: 0000000000000200 RBX: 0000000000000200 RCX: dead000000000400
RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000200
RBP: 0000000000000001 R08: ffff8e0f2c990700 R09: ffff8e0f2c990788
R10: ffffffff87731a00 R11: 0000000000000000 R12: ffff8e0f2c990700
R13: ffff8e0f24abf978 R14: ffff8e0f2c990700 R15: ffff8e0f25822800
FS:  0000000000000000(0000) GS:ffff8e0f3fc00000(0000) knlGS:0000000000000000
CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
CR2: 00007fd8cccf7000 CR3: 000000005820a005 CR4: 00000000001606f0`,
    `Call Trace:
 ? generic_make_request_checks+0x393/0x630
 generic_make_request+0x1a4/0x410
 submit_bio+0x45/0x140
 ? bio_add_page+0x42/0x50
 _xfs_buf_ioapply+0x2e2/0x480 [xfs]
 ? wake_up_q+0x70/0x70
 ? xfs_buf_delwri_submit_buffers+0x110/0x2a0 [xfs]
 xfs_buf_submit+0x5f/0x1f0 [xfs]
 xfs_buf_delwri_submit_buffers+0x110/0x2a0 [xfs]
 ? xfsaild+0x29f/0x7b0 [xfs]
 ? xfs_inode_item_push+0xbc/0x170 [xfs]
 xfsaild+0x29f/0x7b0 [xfs]
 ? xfs_trans_ail_cursor_first+0x80/0x80 [xfs]
 kthread+0x112/0x130
 ? kthread_create_worker_on_cpu+0x70/0x70
 ret_from_fork+0x35/0x40
Modules linked in: dattobd(OE) ip6t_rpfilter ip6t_REJECT nf_reject_ipv6 xt_conntrack ip_set nfnetlink ebtable_nat ebtable_broute bridge stp llc ip6table_nat nf_conntrack_ipv6 nf_defrag_ipv6 nf_nat_ipv6 ip6table_mangle ip6table_raw ip6table_security iptable_nat nf_conntrack_ipv4 nf_defrag_ipv4 nf_nat_ipv4 nf_nat nf_conntrack iptable_mangle iptable_raw iptable_security ebtable_filter ebtables ip6table_filter ip6_tables kvm_intel kvm irqbypass crct10dif_pclmul iTCO_wdt crc32_pclmul iTCO_vendor_support snd_pcsp ghash_clmulni_intel snd_pcm snd_timer snd joydev soundcore i2c_i801 virtio_net net_failover virtio_balloon failover lpc_ich xfs libcrc32c qxl drm_kms_helper ttm drm crc32c_intel serio_raw virtio_console virtio_scsi qemu_fw_cfg
---[ end trace 51a4cd04ad61f50f ]---`,
    forcedChalk.yellow(`RIP: 0010:tracing_mrf+0x164/0x600 [dattobd]`),
    `Code: d8 48 c1 e0 04 4c 01 c8 8b 78 08 48 8b 08 89 f8 29 f0 39 d8 0f 47 c3 48 85 c9 74 7e 48 8b 49 18 48 85 c9 74 75 f6 c1 01 75 70 <48> 8b 09 49 39 cd 0f 85 8f 02 00 00 41 8b 4e 10 44 0f b6 c1 41 83
RSP: 0018:ffffb186c0557be0 EFLAGS: 00010246
RAX: 0000000000000200 RBX: 0000000000000200 RCX: dead000000000400
RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000200
RBP: 0000000000000001 R08: ffff8e0f2c990700 R09: ffff8e0f2c990788
R10: ffffffff87731a00 R11: 0000000000000000 R12: ffff8e0f2c990700
R13: ffff8e0f24abf978 R14: ffff8e0f2c990700 R15: ffff8e0f25822800
FS:  0000000000000000(0000) GS:ffff8e0f3fc00000(0000) knlGS:0000000000000000
CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
CR2: 00007fd8cccf7000 CR3: 000000005820a005 CR4: 00000000001606f0
---[ end trace 2c8e01f3f525c0f3 ]---`
  ]
];
