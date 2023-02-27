
import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text, args }) => {
if (!args[0]) return m.reply('*🚩 Ingresa el texto que desees convertir en un código QR*') 

conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '¯\\_(ツ)_/¯', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i


export default handler
