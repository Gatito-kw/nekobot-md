import fetch from 'node-fetch'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn }) => {
   let q = m.quoted ? m.quoted : m
   let mime = (q || q.msg).mimetype || q.mediaType || ''
   if (!/image/.test(mime)) return m.reply('Responde a una Imagen.')
   let url = await webp2png(await q.download())
   let res = await fetch(API('https://api.ocr.space', '/parse/imageurl', { apikey: '8e65f273cd88957', url }))
   if (res.status !== 200) return m.reply(res.statusText)
   let json = await res.json()
   await m.reply(json?.ParsedResults?.[0]?.ParsedText)
}

handler.help = ['ocr']
handler.tags = ['tools']
handler.command = ['ocr']

export default handler