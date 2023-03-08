import yts from 'yt-search'

let handler = async (m, {conn, usedPrefix, text }) => {
   if (!text) return m.reply('Ingrese el título de un video de YouTube.')
   await m.react('🕓')
   let results = await yts(text)
   let res = results.all.map(v => v).filter(v => v.type == "video")
   if (!res.length) return m.reply('No se encontraron resultados, intente con un nombre más Corto.').then(_ => m.react('✖️'))
   let txt = `乂  *Y T  -  S E A R C H*`
   for (let i = 0; i < 15; i++) {
      txt += `\n\n`
      txt += `	◦  *Nro* : ${1+i}\n`
	  txt += `	◦  *Titulo* : ${res[i].title}\n`
	  txt += `	◦  *Autor* : ${res[i].author.name || '×'}\n`
	  txt += `	◦  *Url* : ${'https://youtu.be/' + res[i].videoId}\n`
   }
   let img = await (await fetch(res[0].image)).buffer()
   await conn.sendUrl(m.chat, txt, m, {
      mentionedJid: [m.sender],
      externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         thumbnail: img,
         thumbnailUrl: img,
         title: global.textbot.title,
      }
   })
   await m.react('✅')
}

handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']

handler.react_error = true

export default handler

function sNum(num) {
    return new Intl.NumberFormat('en-GB', { notation: "compact", compactDisplay: "short" }).format(num)
}

function eYear(txt) {
    if (txt.includes('month ago')) {
        var T = txt.replace("month ago", "").trim()
        var L = 'hace '  + T + ' mes'
        return L
    }
    if (txt.includes('months ago')) {
        var T = txt.replace("months ago", "").trim()
        var L = 'hace ' + T + ' meses'
        return L
    }
    if (txt.includes('year ago')) {
        var T = txt.replace("year ago", "").trim()
        var L = 'hace ' + T + ' año'
        return L
    }
    if (txt.includes('years ago')) {
        var T = txt.replace("years ago", "").trim()
        var L = 'hace ' + T + ' años'
        return L
    }
    if (txt.includes('hour ago')) {
        var T = txt.replace("hour ago", "").trim()
        var L = 'hace ' + T + ' hora'
        return L
    }
    if (txt.includes('hours ago')) {
        var T = txt.replace("hours ago", "").trim()
        var L = 'hace ' + T + ' horas'
        return L
    }
    if (txt.includes('minute ago')) {
        var T = txt.replace("minute ago", "").trim()
        var L = 'hace ' + T + ' minuto'
        return L
    }
    if (txt.includes('minutes ago')) {
        var T = txt.replace("minutes ago", "").trim()
        var L = 'hace ' + T + ' minutos'
        return L
    }
    if (txt.includes('day ago')) {
        var T = txt.replace("day ago", "").trim()
        var L = 'hace ' + T + ' dia'
        return L
    }
    if (txt.includes('days ago')) {
        var T = txt.replace("days ago", "").trim()
        var L = 'hace ' + T + ' dias'
        return L
    }
}