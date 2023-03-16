import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   if (!args[0]) return m.reply('Ingresa el enlace que quieres Acortar.')
   let res = await fetch('https://linkpoi.ga/api.php?url=' + args[0])
   let json = await res.json()
   await m.reply(json.shorturl.replace('\/','/'))
}

handler.help = ['linkpoi']
handler.tags = ['tool']
handler.command = ['linkpoi']

export default handler