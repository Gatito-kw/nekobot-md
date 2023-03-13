import { format } from 'util'
const { default: { Image } } = await import('node-webpmux')

let handler = async (m) => {
   let isStick = 'Responde a un Sticker.'
   if (!m.quoted) return m.reply(isStick)
   if (!/sticker/.test(m.quoted.mtype)) return m.reply(isStick)
   let img = new Image()
   await img.load(await m.quoted.download())
   await m.reply(format(JSON.parse(img.exif.slice(22).toString())))
}

handler.help = ['getexif']
handler.tags = ['tool']
handler.command = ['getexif']

export default handler