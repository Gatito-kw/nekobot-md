import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
   await m.react('🕓')
   let res = await fetch('https://api.waifu.pics/sfw/shinobu')
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   if (!json.url) return m.react('❌')
   await conn.sendFile(m.chat, json.url, 'shinobu.png', '*RANDOM SHINOBU*', m)
   await m.react('✅')
}

handler.help = ['shinobu']
handler.tags = ['anime']
handler.command = ['shinobu']

handler.react_error = true

export default handler