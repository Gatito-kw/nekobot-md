import cp from 'child_process'
import { promisify } from 'util'

let handler = async (m, { conn, text }) => {
   await m.reply('Updating Script...')
   let exec = promisify(cp.exec).bind(cp)
   let u
   try {
      u = await exec('git pull')
   } catch (e) {
      u = e
   } finally {
      let { stdout, stderr } = u
      let log
      if (stderr.trim()) log += stderr.trim() + '\n\n\n'
      if (stdout.trim()) log += stdout.trim()
      await m.reply(log.trim())
      await m.reply(`${JSON.stringify(u, null, 1)}`)
   }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix']

handler.rowner = true

export default handler