import Connection from './lib/connection.js'
import { watchFile, unwatchFile, readFileSync } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
   ['51940617554', '「gatitoツ」', true],
   ['50246028932', 'Sin Nombre', true]
]

global.mods = []
global.prems = []

global.APIs = {
   nrtm: 'https://nurutomo.herokuapp.com',
   bg: 'http://bochil.ddns.net',
   xteam: 'https://api.xteam.xyz',
   zahir: 'https://zahirr-web.herokuapp.com',
   zeks: 'https://api.zeks.xyz',
   pencarikode: 'https://pencarikode.xyz',
   LeysCoder: 'https://leyscoders-api.herokuapp.com'
}

global.APIKeys = {
   'https://api.xteam.xyz': 'd90a9e986e18778b',
   'https://zahirr-web.herokuapp.com': 'zahirgans',
   'https://api.zeks.xyz': 'apivinz',
   'https://pencarikode.xyz': 'pais',
   'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

global.imgbot = {
   neko1: readFileSync('./src/image/neko-1.jpg'),
   neko2: readFileSync('./src/image/neko-2.jpg'),
   neko3: readFileSync('./src/image/neko-3.jpg'),
   noprofile: readFileSync('./src/image/no-profile.jpg'),
   noprofileurl: 'https://i.ibb.co/fp6t21w/avatar.jpg',
}

global.textbot = {
   title: 'ㅤ·ㅤ© NekoBot-MD / Neko Team  (ねこ)ㅤ·ㅤ',
   footer: 'Simple - WhatsApp Bot - MD',
}

global.fakebot = {
   gif(text = null, img = null) {
      return { key: { participant: '0@s.whatsapp.net', remoteJid: '6287834993722-1621306547@g.us', fromMe: false, id: 'BAE5D0B72A69AF85' }, message: { videoMessage: { title: null, h: 'Hmm', seconds: 999999999, gifPlayback: true, caption: text, jpegThumbnail: img }}}
   }
}

// Sticker WM
global.packname = 'Sticker.ly'
global.author = 'NK - ねこ'

global.wmbot = {
   name: 'Sticker.ly',
   author: 'NK - ねこ',
}

global.multiplier = 200

global.rpg = {
   emoticon(string) {
      string = string.toLowerCase()
      let emot = {
         role: '🏅',
         level: '🧬',
         limit: '🌌',
         health: '❤️',
         exp: '✉️',
         money: '💵',
         potion: '🥤',
         diamond: '💎',
         wood: '🪵',
         rock: '🪨',
         iron: '🔩',
         gold: '👑',
         emerald: '💚'
      }
      let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
      if (!results.length) return ''
      else return emot[results[0][0]]
   },
   role(level) {
      level = parseInt(level)
      if (isNaN(level)) return { name: '', level: '' }
      const role = [
         { name: 'Bronce I', level: 0 }, { name: 'Bronce II', level: 6 }, { name: 'Bronce III', level: 12 },
         { name: 'Plata I', level: 18 }, { name: 'Plata II', level: 24 }, { name: 'Plata III', level: 30 },
         { name: 'Oro I', level: 36 }, { name: 'Oro II', level: 42 }, { name: 'Oro III', level: 48 },
         { name: 'Diamante I', level: 45 }, { name: 'Diamante II', level: 54 }, { name: 'Diamante III', level: 60 },
         { name: 'Mítico I', level: 66 }, { name: 'Mítico II', level: 72 }, { name: 'Mítico III', level: 78 },
         { name: 'Legendario I', level: 84 }, { name: 'Legendario II', level: 90 }, { name: 'Legendario III', level: 96 },
         { name: 'Maestro', level: 102 }, { name: 'Maestro', level: 1000 },
      ]
      return role.reverse().find(role => level >= role.level)
   }
}

// Games mini Database
global.game = {
   slot: {},
   math: {},
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  Connection.conn.logger.info("Update 'config.js'")
  import(`${file}?update=${Date.now()}`)
})
