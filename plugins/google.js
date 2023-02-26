import { googleIt } from '@bochilteam/scraper'
let handler = async (m, { conn, command, args }) => {
    const fetch = (await import('node-fetch')).default
    let full = /f$/i.test(command)
    let text = args.join` `
    if (!text) return conn.reply(m.chat, '❄️ Que desea buscar en Google?', m)
    let url = 'https://google.com/search?q=' + encodeURIComponent(text)
    let search = await googleIt(text)
    let msg = search.articles.map(({
        // header,
        title,
        url,
        description
    }) => {
        return `*${title}*\n_${url}_\n_${description}_`
    }).join('\n\n')
    try {
        let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).arrayBuffer()
        if (/<!DOCTYPE html>/i.test(ss.toBuffer().toString())) throw ''
        await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m)
    } catch (e) {
        conn.sendMessage(m.chat, {video: {url: "https://telegra.ph/file/fdbd14f129d8611c8a020.mp4"}, caption: '\t\t\t\t\t\t*乂 Google search 乂*\n\n' + msg, gifPlayback: true}, {quoted: m})
   }
}
handler.help = ['google <consulta>']
handler.tags = ['internet']
handler.command = ['google'] 


export default handler
