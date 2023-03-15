import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply('Ingresa el wallpaper que desea Buscar')
    await m.react('🕓')
    let res = await fetch(`https://api.lolhuman.xyz/api/wallpaper?apikey=BrunoSobrino&query=${text}`)
    if (!res.ok) return m.react('❌')
    let img = await res.buffer()
    if (img == undefined) return m.reply('Wallpaper no encontrada, Intenta con otro Nombre.').then(async _ => await m.react('✖️'))
    await conn.sendButton(m.chat, '*WALLPAPER*', 'Click para la siguiente Imagen', img, [['Siguiente ➡️', `${usedPrefix + command} ${text}`]], m)
    await m.react('✅️')
}

handler.help = ['wallpaper']
handler.tags = ['image']
handler.command = ['wallpaper']

handler.react_error = true

export default handler