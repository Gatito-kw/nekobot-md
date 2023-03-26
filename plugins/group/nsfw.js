import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let chat = db.data.chats[m.chat]
   if (args[0] === 'on') {
      if (chat.isNsfw) return m.reply('Nsfw ya esta Activada.')
      chat.isNsfw = true
      await m.reply('🚩 Nsfw activada para este Grupo.')
   } else if (args[0] === 'off') {
      if (!chat.isNsfw) return m.reply('Nsfw ya esta Desactivada.')
      chat.isNsfw = false
      await m.reply('🚩 Nsfw desactivada para este Grupo.')
   } else {
      await m.reply(`*Configurar Nsfw*. Escriba on para activar y off para Desactivar.`)
   }
}

handler.help = ['nsfw']
handler.tags = ['group']
handler.command = ['nsfw']
handler.use = ['on/off']

handler.admin = true

export default handler