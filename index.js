console.log('Iniciado Script...')

import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import Helper from './lib/helper.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

say("neko-md", {
   font: "block",
   align: "center",
   gradient: ["green","magenta"],
})
say("- Created by Gatito -", {
   font: "console",
   align: "center",
   colors: ["yellow"],
})

var isRunning = false

function start(file) {
  if (isRunning) return
  isRunning = true
  let args = [join(__dirname, file), ...process.argv.slice(2)]
  say([process.argv[0], ...args].join(''), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  setupMaster({
    exec: args[0],
    args: args.slice(1),
  })
  let p = fork()
  p.on('message', data => {
    switch (data) {
      case 'stop':
        p.process.kill()
      break
      case 'reset':
        p.process.kill()
        isRunning = false
        start.apply(this, arguments)
      break
      case 'uptime':
        p.send(process.uptime())
      break
    }
  })
  p.on('exit', (_, code) => {
    isRunning = false
    console.error('❌ Codigo de Error:', code)
    if (code === 0) return
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start(file)
    })
  })
  if (!Helper.opts['test'])
    if (!rl.listenerCount()) rl.on('line', line => {
      p.emit('message', line.trim())
    })
}

start('main.js')