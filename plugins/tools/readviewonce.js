let handler = async (m, { conn }) => {
   if (!m.quoted) return m.reply('Responde a un mensaje ViewOnce.')
   if (m.quoted.mtype !== 'viewOnceMessageV2') return m.reply('Responde a un mensaje ViewOnce.')
   let media = await m.quoted.download()
   await conn.sendFile(m.chat, media, 'Read-View-Once.jpg', m.quoted.text, m)
}

handler.help = ['readviewonce']
handler.tags = ['tool']
handler.command = ['readviewonce', 'read', 'ver', 'readvo', 'rvo']

export default handler