import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
   await m.react('🕓')
   let res = await fetch('https://api.waifu.pics/nsfw/waifu')
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   if (!json.url) return m.react('❌')
   await conn.sendFile(m.chat, json.url, 'xwaifu.png', '*RANDOM WAIFU*', m)
   await m.react('✅')
}

handler.help = ['xwaifu']
handler.tags = ['nsfw']
handler.command = ['xwaifu']

handler.nsfw = true

export default handler