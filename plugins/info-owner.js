let handler = async (m, { conn, usedPrefix, __dirname }) => {
   const data = global.owner.filter(([id, isCreator]) => id && isCreator)
   await conn.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
}

handler.help = ['creator']
handler.tags = ['info']
handler.command = ['owner', 'creator']

export default handler