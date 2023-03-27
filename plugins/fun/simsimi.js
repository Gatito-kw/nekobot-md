import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   if (!text) return m.reply('Ingresa un Texto.')
   await conn.sendPresenceUpdate('composing', m.chat)
   let res = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=es`)     //let res = await fetch('https://api.simsimi.info/v1/simtalk', { method: 'POST', body: new URLSearchParams({ 'text': text, 'lc': 'es' })})  //https://simsimi.info/api/?text=${text}&lc=es   ||   https://api-sv2.simsimi.net/v2/?text=${text}&lc=es   ||   https://api.simsimi.net/v2/?text=${text}&lc=es&cf=false
   let json = await res.json()
   await m.reply(`${json.success.trim()}`)
}

handler.help = ['simsimi']
handler.tags = ['fun']
handler.command = ['simsimi', 'simi']

export default handler