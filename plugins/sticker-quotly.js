import axios from 'axios'

let handler = async (m, { conn, text }) => {
   if (!text) return m.reply('Ingresa un Texto.')
   if (text.length > 30) return m.reply('Solo se permiten 30 caracteres como Máximo.')
   let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => global.imgbot.noprofile)
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
   await m.reply(`${json.data.result.image}`)
}

handler.help = ['quotly']
handler.tags = ['sticker']
handler.command = ['quotly']

export default handler