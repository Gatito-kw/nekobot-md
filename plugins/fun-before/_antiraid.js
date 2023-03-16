import db from '../../lib/database.js'
import { WAMessageStubType } from '@adiwajshing/baileys'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

export async function before(m, { conn, participants }) {
   if (!m.messageStubType || !m.isGroup)
      return !0
   let chat = db.data.chats[m.chat]
   let groupName = (await conn.groupMetadata(m.chat)).subject
   let groupAdmins = participants.filter(p => p.admin)
   let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => global.imgbot.noprofileurl)
   let img = await (await fetch(pp)).buffer()
   if (chat.antiRaid && m.messageStubType == 29) {
      let txt1 = `Recientemente se ha promovido un miembro a administrador, Para evitar raid, Este mensaje aparece.\n\n`
         txt1 += `	◦  *Grupo* : ${groupName}\n`
         txt1 += `	◦  *Usuario* : @${m.messageStubParameters[0].split`@`[0]}\n`
         txt1 += `	◦  *De* : @${m.sender.split`@`[0]}\n`
         txt1 += `	◦  *Fecha* : ${moment().format('DD/MM/YY - HH:mm:ss')}\n\n`
         txt1 += `Este mensaje ha mencionado a todos los Admins.`
      await conn.sendUrl(m.chat, txt1, global.fakebot.gif('Promote Detect. 🍟', await conn.resize(global.imgbot.neko2, 300, 300)), {
         mentionedJid: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)],
         externalAdReply: {
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: img,
            thumbnailUrl: img,
            title: global.textbot.title,
         }
      })
   }
   if (chat.antiRaid && m.messageStubType == 30) {
      let txt2 = `Recientemente se ha degradado un administrador a miembro, Para evitar raid, Este mensaje aparece.\n\n`
         txt2 += `	◦  *Grupo* : ${groupName}\n`
         txt2 += `	◦  *Usuario* : @${m.messageStubParameters[0].split`@`[0]}\n`
         txt2 += `	◦  *De* : @${m.sender.split`@`[0]}\n`
         txt2 += `	◦  *Fecha* : ${moment().format('DD/MM/YY - HH:mm:ss')}\n\n`
         txt2 += `Este mensaje ha mencionado a todos los Admins.`
      await conn.sendUrl(m.chat, txt2, global.fakebot.gif('Demote Detect. 🍟', await conn.resize(global.imgbot.neko2, 300, 300)), {
         mentionedJid: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)],
         externalAdReply: {
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: img,
            thumbnailUrl: img,
            title: global.textbot.title,
         }
      })
   }
}