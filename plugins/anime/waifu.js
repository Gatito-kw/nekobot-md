import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
   await m.react('🕓')
   let res = await fetch('https://api.waifu.pics/sfw/waifu')
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   if (!json.url) return m.react('❌')
   await conn.sendFile(m.chat, json.url, 'waifu.png', '*RANDOM WAIFU*', m)
   await m.react('✅')
}

handler.help = ['waifu']
handler.tags = ['anime']
handler.command = ['waifu']

handler.react_error = true

export default handler