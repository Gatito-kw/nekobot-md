import { format } from 'util'
import pkg from 'node-webpmux'
const { Image } = pkg

let handler = async (m) => {
   if (!m.quoted) return m.reply('Responde a un Sticker.')
   if (!/sticker/.test(mime)) return m.reply('Pndj responde a un Sticker.')
   let exif = await m.quoted.download()
   await m.reply(format(JSON.parse(exif.exif.slice(22).toString())))
}

handler.help = ['getexif']
handler.tags = ['tool']
handler.command = ['getexif']

export default handler