let handler = async (m, { conn, args }) => {
   let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => global.imgbot.noprofileurl)
   await conn.sendFile(m.chat, pp, 'Profile.jpg', null, m)
}

handler.help = ['getppgroup']
handler.tags = ['tool']
handler.command = ['getppgroup', 'getppgp', 'getprofilegroup']

export default handler