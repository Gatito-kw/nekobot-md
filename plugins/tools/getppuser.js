let handler = async (m, { conn, args }) => {
   if (!m.mentionedJid[0] && !m.quoted) return m.reply('Menciona a un Usuario.')
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
   let pp = await conn.profilePictureUrl(who, 'image').catch(_ => global.imgbot.noprofileurl)
   await conn.sendFile(m.chat, pp, 'Profile.jpg', null, m)
}

handler.help = ['getppuser']
handler.tags = ['tool']
handler.command = ['getppuser', 'getprofileuser']

export default handler