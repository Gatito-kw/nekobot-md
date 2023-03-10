import cp from 'child_process'
import { promisify } from 'util'

let handler = async (m) => {
   await m.reply('Updating Script...')
   let exec = promisify(cp.exec).bind(cp)
   let log
   try {
      log = await exec('git pull')
   } catch (e) {
      log = e
   } finally {
      await m.reply(`${log.stderr.trim() || ''}\n\n\n${log.stdout.trim() || ''}`.trim())
   }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix']

handler.rowner = true

export default handler