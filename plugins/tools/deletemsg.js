let handler = async (m, { conn, usedPrefix, command }) => {	
   if (!m.quoted) return m.reply('Responde a un Mensaje.')
   try {
      let delet = m.message.extendedTextMessage.contextInfo.participant
      let bang = m.message.extendedTextMessage.contextInfo.stanzaId
      return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
   } catch {
      return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
   }
}

handler.help = ['deletemsg']
handler.tags = ['tool']
handler.command = ['delete-msg', 'del-msg', 'delmsg', 'deletemsg']

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler