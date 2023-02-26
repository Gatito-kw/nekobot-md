import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
   await m.reply('*🚩 Reiniciando Bot...*')
   process.send('reset')
}

handler.help = ['reset']
handler.tags = ['owner']
handler.command = ['reset', 'reiniciar']

handler.rowner = true

export default handler