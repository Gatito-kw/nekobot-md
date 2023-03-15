import { plugins } from '../lib/plugins.js'

let handler = async (m, { conn, args, text }) => {
   let cmd = Object.values(plugins).filter((v) => v.tags && v.help.find((x) => x == args[0])).filter(c => c)
   await m.reply(`${JSON.stringify(cmd, null, 1)}`)
}

handler.command = ['test']

export default handler
