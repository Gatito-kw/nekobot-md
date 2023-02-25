import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
   let stdout = execSync('git pull https://Gatito-kw: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@github.com/Gatito-kw/nekobot-md')
   await m.reply(stdout.toString())
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix']

handler.rowner = true

export default handler
