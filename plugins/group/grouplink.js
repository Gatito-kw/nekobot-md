import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, args }) => {
   let name = (await conn.groupMetadata(m.chat)).subject
   let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
   let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => global.imgbot.noprofileurl)
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