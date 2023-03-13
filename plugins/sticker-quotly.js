import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, text }) => {
   if (!text) return m.reply('Ingresa un Texto.')
   if (text.length > 30) return m.reply('Solo se permiten 30 caracteres como Máximo.')
   let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => global.imgbot.noprofileurl)
   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#FFFFFF",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stick = await sticker(buffer, false, global.wmbot.name, global.wmbot.author)
   await conn.sendFile(m.chat, stick, 'Quotly.webp', '', m)
}

handler.help = ['quotly']
handler.tags = ['sticker']
handler.command = ['quotly']

export default handler