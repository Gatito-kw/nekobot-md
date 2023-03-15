let handler = async (m, { conn, text }) => {
   let res = await Testing(text)
   await m.reply(`${JSON.stringify(res, null, 1)}`)
}

handler.command = ['testing']

export default handler
