let handler = async (m, { conn, participants }) => {
   if (!m.mentionedJid[0] && !m.quoted) return m.reply('Menciona al usuario que quieres Promover.')
   let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
   let adm = participants.filter(v => v.admin).find((v) => v.id === user)?.id
   if (conn.user.jid == user) return m.reply('Ya soy administradora del Grupo.')
   if (adm == user) return m.reply('El usuario ya es Administrador.')
   let prom = await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
   if (prom[0].status === '404') return m.reply('El usuario no esta en el Grupo.')
   await m.reply(`🚩 Usuario @${user.split`@`[0]} promovido con Exito.`, null, { mentions: [user] })
}

handler.help = ['promote']
handler.tags = ['group']
handler.command = ['promote']

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler