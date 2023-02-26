const { generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default
import { promises } from 'fs'
import { join } from 'path'
import { plugins } from '../lib/plugins.js'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { performance } from 'perf_hooks'
import moment from 'moment-timezone'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix, __dirname }) => {
   let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
   let d = new Date()
   let locale = 'es-ES'
   let week = d.toLocaleDateString(locale, { weekday: 'long' })
   let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
   })
   let hour = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
   })
   let tags = {
      'main': 'PRINCIPAL',
      'info': 'INFO',
      'game': 'JUEGOS',
      'rpg': 'RPG',
      'fun': 'DIVERSION',
      'sticker': 'STICKER',
      'convert': 'CONVERTIDOR',
      'image': 'IMAGEN',
      'maker': 'MAKER',
      'group': 'GRUPO',
      'anime': 'ANIME',
      'download': 'DESCARGAS',
      'search': 'BUSQUEDA',
      'tool': 'AJUSTES',
      'database': 'DATABASE',
      'nsfw': 'NSFW', 
      'owner': 'CREADOR', 
      'advanced': 'AVANZADO',
   }
   for (let plugin of Object.values(plugins).filter(plugin => !plugin.disabled))
      if (plugin && 'tags' in plugin)
         for (let tag of plugin.tags)
            if (!(tag in tags) && tag) tags[tag] = tag
   let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
         help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
         use: plugin.use,
         tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
         prefix: 'customPrefix' in plugin,
         limit: plugin.limit,
         premium: plugin.premium,
         disabled: plugin.disabled,
      }
   })
   let groups = {}
   for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
         if (menu.tags && menu.tags.includes(tag))
         if (menu.help) groups[tag].push(menu)
   }
   let _text += `Hola @${m.sender.split`@`[0]} ${greeting}, aquí te muestro mi lista de comandos.\n\n`
   for (let tag in groups) {
      _text += `   *${tag.replace(tag, tags[tag])}*\n\n`
      for (let menu of groups[tag]) {
         for (let help of menu.help) {
               _text += `     ◦  ${menu.prefix ? help : usedPrefix + help}\n`
         }
      }
      _text += '\n'
   }
   _text += `${textbot.footer}`
   
   let buttons = [
      { buttonId: `${usedPrefix}infobot`, buttonText: { displayText: 'INFO' }, type: 1 },
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: 'CREADOR' }, type: 1 }
   ]
    
   let buttonMessage = {
      document: await conn.resize(global.imgbot.neko1, 450, 319), 
      fileName: '⌗ 【 Nᴇᴋᴏʙᴏᴛ - Oғɪᴄɪᴀʟ 】 ⋮ 🐈₊', 
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      jpegThumbnail: await conn.resize(global.imgbot.neko1, 450, 319), 
      caption: _text, 
      fileLength: '9999999999999', 
      pageCount: '100', 
      mentions: [m.sender], 
      footer: global.textbot.footer,
      buttons: buttons, 
      headerType: 4, 
      contextInfo: {
         mentionedJid: [m.sender],
         externalAdReply: {
            "showAdAttribution": true,
            "mediaUrl": 'https://chat.whatsapp.com/NEKO',
            "title": '作成されたボット — 尼僧', 
            "mediaType": 1, 
            "thumbnail": imgbot.neko2,
            "renderLargerThumbnail": false,
            "previewType": "PHOTO",
            "sourceUrl": 'https://chat.whatsapp.com/NEKO'
         }
      }
   }
   await conn.sendMessage(m.chat, buttonMessage, { quoted: m })
   /*
   let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: {
      text: _text,
      contextInfo: {
         mentionedJid: [m.sender],
         externalAdReply: {
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: 'https://chat.whatsapp.com/NEKO',
            thumbnail: imgbot.nekologo,
            thumbnailUrl: imgbot.nekologo,
            title: textbot.title,
         }
      }
   }}, { quoted: m })
   */
   await conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'comandos']

export default handler

const greeting = () => {
   let time = new Date().getHours()
   let res = 'Buenos dias, tardes o noches? 🤔'
   if ([4, 5, 6, 7, 8, 9, 10, 11].includes(time)) res = `Buenos dias 🌤️`
   if ([12, 13, 14, 15, 16, 17, 18, 19, 20].includes(time)) res = `Buenas tardes 🥀`
   if ([21, 22, 23, 24, 0, 1, 2, 3].includes(time)) res = `Buenas noches 🦉`
   return res
}