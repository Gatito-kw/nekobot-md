import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
   let stdout = execSync('git pull')
   await m.reply(stdout.toString())
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix']

handler.rowner = true

export default handler