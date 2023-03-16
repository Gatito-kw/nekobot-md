import { areJidsSameUser } from '@adiwajshing/baileys'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, text, usedPrefix, command, isBotAdmin }) => {
   let from = text.endsWith('@g.us') ? text : m.chat
   if (args[0] == '--list') {
      let groups = Object.entries(await conn.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let rows = []
      groups.map(x => {
         rows.push(['GET LINK ➠ ' + x.subject, `${usedPrefix + command} ${x.id}`, `[ Usuarios: ${x.participants.length} | Creación : ${moment(x.creation * 1000).format('DD/MM/YY - HH:mm:ss')} ]`])
      })
      await conn.sendList(m.chat, null, `*Lista de Grupos. 🍟*\n\n	◦  *Total* : ${groups.length}`, null, 'Tap!', [['GRUPOS', rows]], m)
      return !0
   }
   let groupMetadata = await conn.groupMetadata(from)
   let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
   if (!me.admin) return m.reply('No soy admin de ese Grupo.')
   let name = (await conn.groupMetadata(from)).subject
   let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(from)
   let pp = await conn.profilePictureUrl(from, 'image').catch(_ => global.imgbot.noprofileurl)
   let img = await (await fetch(pp)).buffer()
   await conn.sendUrl(m.chat, '*Enlace del Grupo. 🍟*\n' + link, m, {
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         sourceUrl: link,
         thumbnail: img,
         thumbnailUrl: img,
         title: name,
      }
   })
}

handler.help = ['grouplink']
handler.tags = ['group']
handler.command = ['grouplink', 'gplink']

handler.group = true
handler.botAdmin = true

export default handler