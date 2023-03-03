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
      let out, err
      if (stdout.trim()) out = stdout.trim() || ''
      if (stderr.trim()) err = stderr.trim() || ''
      await m.reply((err + '\n\n' + out).trim())
   }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix']

handler.rowner = true

export default handler