let handler = async (m, { groupMetadata }) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   let nro = (100).getRandom()
   await m.reply(`@${who.split("@")[0]} es ${nro}% Gay 🏳️‍🌈.`, null, { mentions: [who] })
}

handler.help = ['gaycheck']
handler.tags = ['fun']
handler.command = ['gaycheck']

handler.group = true

export default handler