import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa el titulo de un Wallpaper.')
   await m.react('🕓')
   let res = await fetch(global.API('https://wall.alphacoders.com/api2.0','/get.php', { auth: '3e7756c85df54b78f934a284c11abe4e', method: 'search', term: text }))
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)]
   await conn.sendButton(m.chat, '*WALLPAPER*', 'Tap!', img.url_image, [['Siguiente ➡️', `${usedPrefix + command}`]], m)
   await m.react('✅')
}

handler.help = ['wallpaper']
handler.tags = ['image']
handler.command = ['wallpaper']

handler.react_error = true

export default handler