import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
   await m.react('🕓')
   let res = await fetch('https://fantox-cosplay-api.onrender.com')
   if (!res.ok) return m.react('❌')
   let img = await res.buffer()
   await conn.sendButton(m.chat, '*RANDOM COSPLAY*', 'Click para la siguiente Imagen', img, [['Siguiente ➡️', `${usedPrefix + command}`]], m)
   await m.react('✅')
}

handler.help = ['cosplay']
handler.tags = ['image']
handler.command = ['cosplay']

handler.react_error = true

export default handler