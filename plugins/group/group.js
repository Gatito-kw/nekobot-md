import db from '../../lib/database.js'

let handler = async (m, { conn, args, usedPrefix, command, groupMetadata }) => {
   let group = groupMetadata
   let rows = [
      ['Abrir', `${usedPrefix + command} open`],
      ['Cerrar', `${usedPrefix + command} close`]
   ]
   if (args[0] === 'open') {
      if (!group.announce) return m.reply('El grupo ya está Abierto.')
      await conn.groupSettingUpdate(m.chat, isClose)
      await m.reply('🚩 Grupo abierto con Exito.')
   } else if (args[0] === 'close') {
      if (group.announce) return m.reply('El grupo ya está Cerrado.')
      await conn.groupSettingUpdate(m.chat, 'not_announcement')
      await m.reply('🚩 Grupo cerrado con Exito.')
   } else {
      await conn.sendList(m.chat, null, `*Configurar Grupo. 🍟*\n\n	◦  *Estado* : [ ${!group.announce ? 'OPEN' : 'CLOSE'} ]`, null, 'Tap!', [['CONFIGURAR GRUPO', rows]], m)
   }
}

handler.help = ['group']
handler.tags = ['group']
handler.command = ['group']
handler.use = ['open/close']

handler.admin = true

export default handler