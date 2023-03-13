let handler = async (m, { conn, text }) => {
   let [l, r] = text.split`|`
   if (!l) l = ''
   if (!r) r = ''
   await m.reply(l + readMore + r)
}

handler.help = ['readmore']
handler.tags = ['tools']
handler.command = ['readmore']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)