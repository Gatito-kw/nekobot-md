import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
   await m.reply('Restarting Script...')
   process.send('reset')
}

handler.help = ['reset']
handler.tags = ['owner']
handler.command = ['reset', 'restart', 'restarting', 'reiniciar']

handler.rowner = true

export default handler