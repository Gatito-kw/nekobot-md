import cp from 'child_process'
import { promisify } from 'util'

let handler = async (m, { conn, text }) => {
   await m.reply('Updating...')
   let exec = promisify(cp.exec).bind(cp)
   let u
   try {
      u = await exec('git pull')
   } catch (e) {
      u = e
   } finally {
      let { stdout, stderr } = u
      if (stdout.trim()) m.reply(stdout)
      if (stderr.trim()) m.reply(stderr)
   }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix']

handler.rowner = true

export default handler