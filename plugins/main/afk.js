import db from '../../lib/database.js'

let handler = async (m, { text, conn }) => {
    let user = db.data.users[m.sender]
    user.afk = new Date * 1
    user.afkReason = text
    await m.reply(`🚩 @${m.sender.split`@` [0]} ahora estas AFK.`, false, { mentions: [m.sender] })
}

handler.help = ['afk']
handler.tags = ['main']
handler.command = ['afk']

export default handler