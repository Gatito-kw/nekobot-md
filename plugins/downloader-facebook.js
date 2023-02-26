/*
import needle from 'needle'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, command }) => {
   if (!args[0]) throw `Use example ${usedPrefix}${command} https://fb.watch/azFEBmFRcy/`
   let res = await facebookDl(args[0])
   await m.reply(`${JSON.stringify(res, null, 1)}`)
}

handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = ['facebook', 'fbdl']

export default handler

async function facebookDl(link) {
  try {
    let token, getToken = await needle('get', 'https://www.getvid.io')
    try {
      const $ = cheerio.load(getToken.body)
      token = $('input[name="token"]').val()
    } catch (error) {
      return { error: true, phase: 1, reason: error }
    }
    const
      data = {
        url: link,
        token,
      },
      headers = {
        "Content-Type": "application/json"
      },
      response = await needle('post','https://www.getfvid.io/wp-json/aio-dl/video-data', data, headers)
    try {
      return response.body
    } catch (error) {
      return { error: true, phase: 2, reason: error }
    }
  } catch (error) {
    return { error: true, phase: 0, reason: error }
  }
}
*/