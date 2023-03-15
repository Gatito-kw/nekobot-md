import { googleIt } from '@bochilteam/scraper'

let handler = async (m, { conn, command, args }) => {
   const fetch = (await import('node-fetch')).default
   let full = /f$/i.test(command)
   let text = args.join` `
   if (!text) return conn.reply(m.chat, '❄️ Que desea buscar en Google?', m)
   let url = 'https://google.com/search?q=' + encodeURIComponent(text)
   let search = await googleIt(text)
   let res = search.articles.map(v => v).filter(v => v)
   return console.log(res)
   let txt = `\n\n`
   for (let i = 0; i < (15 <= res.length ? 15 : res.length); i++) {
      txt += ``
   }
   // https://i.ibb.co/NNVScnq/logo-google.jpg
}

handler.help = ['google']
handler.tags = ['internet']
handler.command = ['google'] 

export default handler