import { webp2mp4 } from '../../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
   let isStick = 'Responde a un Sticker.'
   if (!m.quoted) return m.reply(isStick)
   const q = m.quoted || m
   let mime = q.mediaType || ''
   if (!/sticker/.test(mime)) return m.reply(isStick)
   if (!q.isAnimated) return m.reply('El sticker debe estar Animado.')
   let media = await q.download()
   let out = await webp2mp4(media).catch(_ => null) || Buffer.alloc(0)
   await conn.sendMessage(m.chat, { video: { url: out }, caption: null }, { quoted: m })
}

handler.help = ['tovideo']
handler.tags = ['converter']
handler.command = ['tovideo']

export default handler