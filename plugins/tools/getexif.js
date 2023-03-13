import { format } from 'util'
import { Image } from 'node-webpmux'

let handler = async (m) => {
   if (!m.quoted) return m.reply('Responde a un Sticker.')
   if (/sticker/.test(m.quoted.mtype)) {
      let exif = await m.quoted.download()
      await m.reply(format(JSON.parse(exif.exif.slice(22).toString())))
   }
}

handler.help = ['getexif']
handler.tags = ['tool']
handler.command = ['getexif']

export default handler