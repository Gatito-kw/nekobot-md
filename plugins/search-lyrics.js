import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
   let res = await fetch('https://api.popcat.xyz/lyrics?song=' + text)
   if (!res.ok) return m.react('❌')
   let json = await res.json()
   if (!json.lyrics) return m.reply('Letra no encontrada, intenta con otro Titulo.').then(async _ => await m.react('✖️'))
   let txt = `*Lyrics Search*\n\n`
      txt += `*Titulo* : ${json.title}\n`
      txt += `*Artista* : ${json.title}\n\n`
      txt += `*Letra*\n${json.title}`
   await m.reply(txt)
}

handler.help = ['lyrics']
handler.tags = ['search']
handler.command = ['lyrics', 'lyric']

export default handler