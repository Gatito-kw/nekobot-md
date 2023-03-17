let handler = async (m, { groupMetadata }) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   let nro = (100).getRandom()
   await m.reply(`@${who.split("@")[0]} es ${nro}% Otaku 🧧.`, null, { mentions: [who] })
}

handler.help = ['otakucheck']
handler.tags = ['fun']
handler.command = ['otakucheck']

handler.group = true

export default handler