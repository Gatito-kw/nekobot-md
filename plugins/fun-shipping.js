let toM = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b
    do b = ps.getRandom()
    while (b === a)
    await m.reply(`${toM(a)} ❤️ ${toM(b)}`, null, { mentions: [a, b] })
}

handler.help = ['shipping']
handler.tags = ['fun']
handler.command = ['shipping']

handler.group = true

export default handler