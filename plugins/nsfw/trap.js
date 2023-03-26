import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
   await m.react('🕓')
   let res = await fetch('https://api.waifu.pics/nsfw/trap')
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   if (!json.url) return m.react('❌')
   await conn.sendFile(m.chat, json.url, 'trap.png', '*RANDOM TRAP*', m)
   await m.react('✅')
}

handler.help = ['trap']
handler.tags = ['nsfw']
handler.command = ['trap']

handler.nsfw = true

export default handler