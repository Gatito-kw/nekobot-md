let handler = async (m, { conn, text }) => {
   await conn.sendUrl(m.chat, 'Test', contextInfo: { mentionedJid: [m.sender], externalAdReply: {
      mediaType: 1,
      renderLargerThumbnail: true,
      sourceUrl: 'https://chat.whatsapp.com/NEKO',
      thumbnail: global.imgbot.neko3,
      thumbnailUrl: global.imgbot.neko3,
      title: '-'
   }})
}

handler.help = ['test']
handler.tags = ['owner']
handler.command = ['test']

handler.rowner = true

export default handler