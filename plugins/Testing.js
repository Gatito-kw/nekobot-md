import { plugins } from '../lib/plugins.js'

let handler = async (m, { conn, text }) => {
   let cmd = Object.values(plugins).filter((v) => v.help && v.tags).find(c => c)
   console.log(cmd)
}

handler.command = ['test']

export default handler
