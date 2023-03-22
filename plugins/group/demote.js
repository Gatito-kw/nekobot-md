let handler = async (m, { conn, args, participants }) => {
    if (!m.mentionedJid[0] && !m.quoted) return m.reply('Menciona al usuario que quieres Promover.')
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let adm = participants.filter(v => v.admin).find((v) => v.id === user)?.id
    if (!(adm == user)) return m.reply('El usuario no es Administrador.')
    let prom = await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
    if (prom[0].status === '404') return m.reply('El usuario no esta en el Grupo.')
    await m.reply(`🚩 Usuario @${user.split`@`[0]} degradado con Exito.`, null, { mentions: [user] })
}

handler.help = ['demote']
handler.tags = ['group']
handler.command = ['demote']

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler