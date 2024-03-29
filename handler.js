import { smsg } from './lib/simple.js'
import { plugins } from './lib/plugins.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import Connection from './lib/connection.js'
import printMessage from './lib/print.js'
import Helper from './lib/helper.js'
import db, { loadDatabase } from './lib/database.js'
import Queque from './lib/queque.js'

/** @type {import('@adiwajshing/baileys')} */
const { getContentType, proto } = (await import('@adiwajshing/baileys')).default

const isNumber = x => typeof x === 'number' && !isNaN(x)
/**
 * Handle messages upsert
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} chatUpdate
 */
export async function handler(chatUpdate) {
   this.msgqueque = this.msgqueque || new Queque()
   if (!chatUpdate)
      return
   let m = chatUpdate.messages[chatUpdate.messages.length - 1]
   if (!m)
      return
   if (db.data == null)
      await loadDatabase()
   try {
      m = smsg(this, m) || m
      if (!m)
         return
      m.exp = 0
      m.limit = false
      try {
         let user = db.data.users[m.sender]
         if (typeof user !== 'object')
            db.data.users[m.sender] = {}
         if (user) {
            if (!('registered' in user))
               user.registered = false
            if (!isNumber(user.regTime))
               user.regTime = 0
            if (!('name' in user))
               user.name = ''
            if (!isNumber(user.age))
               user.age = 0
            if (!('role' in user))
               user.role = ''
            if (!isNumber(user.level))
               user.level = 0
            if (!isNumber(user.exp))
               user.exp = 0
            if (!isNumber(user.limit))
               user.limit = 0
            if (!isNumber(user.money))
               user.money = 0
            if (!isNumber(user.bank))
               user.bank = 0
            
            if (!isNumber(user.afk))
               user.afk = 0
            if (!('afkReason' in user))
               user.afkReason = ''
            if (!('isBanned' in user))
               user.isBanned = false
            if (!isNumber(user.warn))
               user.warn = 0
            if (!('autoLevelUp' in user))
               user.autoLevelUp = false

            if (!isNumber(user.wood))
               user.wood = 0
            if (!isNumber(user.stone))
               user.stone = 0
            if (!isNumber(user.iron))
               user.iron = 0
            if (!isNumber(user.gold))
               user.gold = 0
            if (!isNumber(user.diamond))
               user.diamond = 0
            if (!isNumber(user.fish))
               user.fish = 0
            if (!isNumber(user.squid))
               user.squid = 0
            if (!isNumber(user.octopus))
               user.octopus = 0

            if (!isNumber(user.pickaxe))
               user.pickaxe = 0
            if (!isNumber(user.fishingrod))
               user.fishingrod = 0

            if (!isNumber(user.lastdaily))
               user.lastdaily = 0
            if (!isNumber(user.lastadventure))
               user.lastadventure = 0
            if (!isNumber(user.lastfishing))
               user.lastfishing = 0
            if (!isNumber(user.lastmining))
               user.lastmining = 0
            if (!isNumber(user.lastrob))
               user.lastrob = 0
         } else db.data.users[m.sender] = {
            registered: false,
            regTime: 0,
            name: m.name,
            age: 0,
            role: 'Beginner',
            level: 0,
            exp: 0,
            limit: 10,
            money: 0,
            bank: 0,
            
            afk: 0,
            afkReason: '',
            isBanned: false,
            warn: 0,
            autoLevelUp: true,

            wood: 0,
            stone: 0,
            iron: 0,
            gold: 0,
            diamond: 0,
            fish: 0,
            squid: 0,
            octopus: 0,

            pickaxe: 0,
            fishingrod: 0,

            lastdaily: 0,
            lastadventure: 0,
            lastfishing: 0,
            lastmining: 0,
            lastrob: 0,
            lastwork: 0,
         }
         let chat = db.data.chats[m.chat]
         if (typeof chat !== 'object')
            db.data.chats[m.chat] = {}
         if (chat) {
            if (!('isBanned' in chat))
               chat.isBanned = false
            if (!('isNsfw' in chat))
               chat.isNsfw = false
            
            if (!('welcome' in chat))
               chat.welcome = false
            if (!('bye' in chat))
               chat.bye = false
            if (!('simsimi' in chat))
               chat.simsimi = false
            if (!('detect' in chat))
               chat.detect = false
            if (!isNumber(chat.expired))
               chat.expired = 0
            
            if (!('sWelcome' in chat))
               chat.sWelcome = false
            if (!('sBye' in chat))
               chat.sBye = false
            if (!('sPromote' in chat))
               chat.sPromote = false
            if (!('sDemote' in chat))
               chat.sDemote = false
            
            if (!('autoSticker' in chat))
               chat.autoSticker = false
            if (!('autoDownload' in chat))
               chat.autoDownload = false
            
            if (!('antiDelete' in chat))
               chat.antiDelete = false
            if (!('antiRaid' in chat))
               chat.antiRaid = false
            if (!('antiSpam' in chat))
               chat.antiSpam = false
            if (!('antiLink' in chat))
               chat.antiLink = false
            if (!('antiFake' in chat))
               chat.antiFake = false
            if (!('antiTraba' in chat))
               chat.antiTraba = false
            if (!('antiViewonce' in chat))
               chat.antiViewonce = false
            if (!('antiToxic' in chat))
               chat.antiToxic = false
         } else db.data.chats[m.chat] = {
            isBanned: false,
            isNsfw: false,
            
            welcome: false,
            bye: false,
            simsimi: false,
            detect: false,
            expired: 0, 
            
            sWelcome: '',
            sBye: '',
            sPromote: '',
            sDemote: '',
            
            autoSticker: false,
            autoDownload: false,
            
            antiDelete: false,
            antiRaid: false,
            antiSpam: false,
            antiLink: false,
            antiFake: false,
            antiTraba: false,
            antiViewOnce: false,
            antiToxic: false,
         }
         let setting = db.data.settings[this.user.jid]
         if (typeof setting !== 'object') db.data.settings[this.user.jid] = {}
         if (setting) {
            if (!'isBanned' in setting)
               setting.isBanned = true
            if (!'autoRead' in setting)
               setting.autoRead = false
         } else db.data.settings[this.user.jid] = {
            isBanned: false,
            autoRead: false,
         }
      } catch (e) {
         console.error(e)
      }
      if (opts['nyimak'])
         return
      if (typeof m.text !== 'string')
         m.text = ''

      const isROwner = [this.decodeJid(this.user.id), ...global.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      const isOwner = isROwner || m.fromMe
      const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

      if (opts['queque'] && m.text && !m.fromMe && !(isMods || isPrems)) {
         const id = m.id
         this.msgqueque.add(id)
         await this.msgqueque.waitQueue(id)
      }

      if (m.isBaileys)
         return
      m.exp += Math.ceil(Math.random() * 10)

      let usedPrefix
      let _user = db.data?.users?.[m.sender]

      const groupMetadata = (m.isGroup ? await Connection.store.fetchGroupMetadata(m.chat, this.groupMetadata) : {}) || {}
      const participants = (m.isGroup ? groupMetadata.participants : []) || []
      const user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
      const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
      const isRAdmin = user?.admin == 'superadmin' || false
      const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
      const isBotAdmin = bot?.admin || false // Are you Admin?

      const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
      for (let name in plugins) {
         let plugin = plugins[name]
         if (!plugin)
            continue
         if (plugin.disabled)
            continue
         const __filename = join(___dirname, name)
         if (typeof plugin.all === 'function') {
            try {
               await plugin.all.call(this, m, {
                  chatUpdate,
                     __dirname: ___dirname,
                     __filename
                  })
            } catch (e) {
               // if (typeof e === 'string') continue
               console.error(e)
               for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                  let data = (await this.onWhatsApp(jid))[0] || {}
                  if (data.exists)
                     m.reply(`*REPORTE  DE  ERROR*\n\n	◦  *Usuario* : @${m.sender.split`@`[0]}\n	◦  *Cmd* : ${m.text}\n	◦  *Plugin* : ${name}`, data.jid, { mentions: [m.sender] })
               }
            }
         }
         const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
         let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix
         let match = (_prefix instanceof RegExp ? // RegExp Mode?
            [[_prefix.exec(m.text), _prefix]] :
            Array.isArray(_prefix) ? // Array?
               _prefix.map(p => {
                  let re = p instanceof RegExp ? // RegExp in Array?
                  p :
                  new RegExp(str2Regex(p))
                  return [re.exec(m.text), re]
               }) :
               typeof _prefix === 'string' ? // String?
                  [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                  [[[], new RegExp]]
         ).find(p => p[1])
         if (typeof plugin.before === 'function') {
            if (await plugin.before.call(this, m, {
               match,
               conn: this,
               participants,
               groupMetadata,
               user,
               bot,
               isROwner,
               isOwner,
               isRAdmin,
               isAdmin,
               isBotAdmin,
               isPrems,
               chatUpdate,
               __dirname: ___dirname,
               __filename
            }))
               continue
         }
         if (typeof plugin !== 'function')
            continue
         if ((usedPrefix = (match[0] || '')[0])) {
            let noPrefix = m.text.replace(usedPrefix, '')
            let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
            args = args || []
            let _args = noPrefix.trim().split` `.slice(1)
            let text = _args.join` `
            command = (command || '').toLowerCase()
            let fail = plugin.fail || global.dfail // When failed
            let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
               plugin.command.test(command) :
               Array.isArray(plugin.command) ? // Array?
                  plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                     cmd.test(command) :
                     cmd === command
                  ) :
                  typeof plugin.command === 'string' ? // String?
                     plugin.command === command : false

            if (!isAccept)
               continue
            m.plugin = name
            if (m.chat in db.data.chats || m.sender in db.data.users) {
               let setting = db.data.settings[this.user.jid]
               let chat = db.data.chats[m.chat]
               let user = db.data.users[m.sender]
               if (!isMods && setting?.isBanned)
                  return
               if (!isMods && chat?.isBanned)
                  return
               if (!isMods && user?.isBanned)
                  return
            }
            if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
               fail('owner', m, this)
                  continue
            }
            if (plugin.rowner && !isROwner) { // Real Owner
               fail('rowner', m, this)
                  continue
            }
            if (plugin.owner && !isOwner) { // Number Owner
               fail('owner', m, this)
                  continue
            }
            if (plugin.mods && !isMods) { // Moderator
               fail('mods', m, this)
                  continue
            }
            if (plugin.premium && !isPrems) { // Premium
               fail('premium', m, this)
                  continue
            }
            if (plugin.group && !m.isGroup) { // Group Only
               fail('group', m, this)
                  continue
            } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
               fail('botAdmin', m, this)
                  continue
            } else if (plugin.admin && !isAdmin) { // User Admin
               fail('admin', m, this)
                  continue
            }
            if (plugin.private && m.isGroup) { // Private Chat Only
               fail('private', m, this)
                  continue
            }
            if (plugin.nsfw && m.isGroup && !db.data.chats[m.chat].isNsfw) {
               fail('nsfw', m, this)
                  continue
            }
            m.isCommand = true
            let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17
            if (xp > 200)
               m.reply('Ngecit -_-')
            else
               m.exp += xp
            if (!isPrems && plugin.limit && db.data.users[m.sender].limit < plugin.limit * 1) {
               m.reply(`*🚩 No tienes suficiente limites, puedes obtener mas escribiendo ${usedPrefix}buy limit*`)
                  continue
            }
            let extra = {
               match,
               usedPrefix,
               noPrefix,
               _args,
               args,
               command,
               text,
               conn: this,
               participants,
               groupMetadata,
               user,
               bot,
               isROwner,
               isOwner,
               isRAdmin,
               isAdmin,
               isBotAdmin,
               isPrems,
               chatUpdate,
               __dirname: ___dirname,
               __filename
            }
            try {
               await plugin.call(this, m, extra)
               if (!isPrems)
                  m.limit = m.limit || plugin.limit || false
            } catch (e) {
               // Error occured
               m.error = e
               console.error(e)
               if (e) {
                  let text = format(e)
                  for (let key of Object.values(global.APIKeys))
                     text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                  if (e.name)
                     for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await this.onWhatsApp(jid))[0] || {}
                           if (data.exists)
                              m.reply(`*REPORTE  DE  ERROR*\n\n	◦  *Usuario* : @${m.sender.split`@`[0]}\n	◦  *Cmd* : ${usedPrefix + command}\n	◦  *Plugin* : ${m.plugin}`, data.jid, { mentions: [m.sender] })
                     }
                  m.reply('*' + e.name + '* : ' + e.message).then(_=> plugin.react_error ? m.react('❌') : null)
               }
            } finally {
               // m.reply(util.format(_user))
               if (typeof plugin.after === 'function') {
                  try {
                     await plugin.after.call(this, m, extra)
                  } catch (e) {
                     console.error(e)
                  }
               }
               if (m.limit)
                  m.reply(`*-${m.limit} ${m.limit ? 'Limite' : 'Limites'}*`)
            }
            break
         }
      }
   } catch (e) {
      console.error(e)
   } finally {
      if (opts['queque'] && m.text) {
         const id = m.id
         this.msgqueque.unqueue(id)
      }
      //console.log(db.data.users[m.sender])
      let user, stats = db.data.stats
      if (m) {
         if (m.sender && (user = db.data.users[m.sender])) {
            user.exp += m.exp
            user.limit -= m.limit * 1
         }

         let stat
         if (m.plugin) {
            let now = +new Date
            if (m.plugin in stats) {
               stat = stats[m.plugin]
               if (!isNumber(stat.total))
                  stat.total = 1
               if (!isNumber(stat.success))
                  stat.success = m.error != null ? 0 : 1
               if (!isNumber(stat.last))
                  stat.last = now
               if (!isNumber(stat.lastSuccess))
                  stat.lastSuccess = m.error != null ? 0 : now
            } else stat = stats[m.plugin] = {
               total: 1,
               success: m.error != null ? 0 : 1,
               last: now,
               lastSuccess: m.error != null ? 0 : now
            }
            stat.total += 1
            stat.last = now
            if (m.error == null) {
               stat.success += 1
               stat.lastSuccess = now
            }
         }
      }
      try {
         if (!opts['noprint']) await printMessage(m, this)
      } catch (e) {
         console.log(m, m.quoted, e)
      }
   }
}

/**
 * Handle groups participants update
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */

export async function participantsUpdate({ id, participants, action }) {
   console.log(action)
   if (this.isInit)
      return !0
   if (db.data == null)
      await loadDatabase()
   let chat = db.data.chats[id] || {}
   let _text = ''
   switch (action) {
      case 'add':
      // case 'remove':
         if (chat.welcome) {
            let groupMetadata = await this.groupMetadata(id)
            for (let user of participants) {
               let pp = await this.profilePictureUrl(user, 'image').catch(_ => imgbot.noprofile)
               let img = await (await this.getFile(pp)).toBuffer()
               _text = (action === 'add' ? (chat.sWelcome || global.msgconfig.welcome || 'Bienvenid@, @user!') : (chat.sBye || global.msgconfig.bye || 'Adiós, @user!'))
                  .replace('@user', '@' + user.split('@')[0])
                  .replace('@group', groupMetadata.subject)
                  .replace('@desc', groupMetadata.desc?.toString() || 'Sin Descripción')
               await this.sendUrl(id, _text, global.fakebot.gif('Welcome to Group. 🍟', await this.resize(global.imgbot.neko2, 300, 300)), {
                  mentionedJid: [user],
                  externalAdReply: {
                     mediaType: 1,
                     renderLargerThumbnail: true,
                     sourceUrl: null,
                     thumbnail: img,
                     thumbnailUrl: img,
                     title: global.textbot.footer,
                  }
               })
            }
         }
         break
    }
}

/**
 * Handle groups update
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
 
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || global.msgconfig.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || global.msgconfig.conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || global.msgconfig.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || global.msgconfig.conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}

/**
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.delete']} message 
 */
export async function deleteUpdate(message) {
/*
    if (Array.isArray(message.keys) && message.keys.length > 0) {
        const tasks = await Promise.allSettled(message.keys.map(async (key) => {
            if (key.fromMe) return
            const msg = this.loadMessage(key.remoteJid, key.id) || this.loadMessage(key.id)
            if (!msg || !msg.message) return
            let chat = db.data.chats[key.remoteJid]
            if (!chat || chat.delete) return

            // if message type is conversation, convert it to extended text message because if not, it will throw an error
            const mtype = getContentType(msg.message)
            if (mtype === 'conversation') {
                msg.message.extendedTextMessage = { text: msg.message[mtype] }
                delete msg.message[mtype]
            }

            const participant = msg.participant || msg.key.participant || msg.key.remoteJid

            await this.reply(key.remoteJid, `
        Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.enable delete*
`.trim(), msg, { mentions: [participant] })
            return await this.copyNForward(key.remoteJid, msg).catch(e => console.log(e, msg))
        }))
        tasks.map(t => t.status === 'rejected' && console.error(t.reason))
    }
*/
}

global.dfail = (type, m, conn) => {
   let msg = {
      rowner: 'ⓘ Este comando solo puede ser utilizado por el *Creador* de la Bot.',
      owner: 'ⓘ Este comando solo puede ser utilizado por el *Creador* de la Bot.',
      mods: 'ⓘ Este comando solo puede ser utilizado por los *Moderatores* de la Bot.',
      premium: 'ⓘ Este comando solo puede ser utilizado por Usuarios *Premium*.',
      group: 'ⓘ Este comando solo puede ser utilizado en *Grupos*.',
      private: 'ⓘ Este comando solo puede ser utilizado en mi Chat *Privado*.',
      admin: 'ⓘ Este comando solo puede ser utilizado por los *Administradores* del Grupo.',
      botAdmin: 'ⓘ La bot deve ser *Administradora* para ejecutar este Comando.',
      nsfw: 'ⓘ El contenido *Nsfw* esta prohibido en este Grupo.',
   }[type]
   if (msg) return m.reply(msg)
}

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => {
   unwatchFile(file)
   Connection.conn.logger.info("Update 'handler.js'")
   if (Connection.reload) await Connection.reload(await Connection.conn)
})