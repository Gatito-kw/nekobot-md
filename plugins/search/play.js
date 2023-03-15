import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
	if (!text) return m.reply('Ingresa el titulo de un video o musica de YouTube.')
	await m.react('🕓')
	let vid = (await yts(text)).videos[0]
	if (!vid) return m.reply('No se encontraron resultados, intente con un nombre más Corto.').then(async _ => await m.react('✖️'))
	let { title, description, thumbnail, videoId, timestamp, views, ago, url, author } = vid
	let link = 'https://youtu.be/' + videoId
	let txt = `\t\t\t🧇 *YouTube Play* 🧇\n\n`
       txt += `   ◦  *Titulo* : ${title || '×'}\n`
       txt += `   ◦  *Duración* : ${timestamp || '×'}\n`
       txt += `   ◦  *Visitas* : ${sNum(views) || views || '×'}\n`
       txt += `   ◦  *Publicado* : ${eYear(ago) || ago || '×'}\n`
       txt += `   ◦  *Autor* : ${author.name || '×'}\n`
       txt += `   ◦  *Id* : ${videoId}\n`
       txt += `   ◦  *Url* : ${link}\n`
    await conn.sendButton(m.chat, txt, 'Elija un formato de descarga mp3 o mp4.', `${thumbnail}`, [['Audio 🎧', `${usedPrefix}ytmp3 ${link} --yes`], ['Video 🎥', `${usedPrefix}ytmp4 ${link} --yes`]], m)
    await m.react('✅')
}

handler.help = ['play']
handler.tags = ['search']
handler.command = ['play', 'ytplay']

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
}