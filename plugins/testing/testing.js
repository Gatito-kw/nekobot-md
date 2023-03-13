let handler = async(m, { conn }) => {
    let teks = `Testing...`
    await m.reply(teks)
}

handler.command = ['test']

export default handler
