import db from '../../lib/database.js'

let handler = async (m, { args }) => {
   let user = db.data.users[m.sender]
   if (!args[0]) return m.reply('Ingresa la cantidad de dinero que deseas Depositar.')
   if (args[0] == '--all') {
      let count = parseInt(user.money)
      user.money -= count * 1
      user.bank += count * 1
      await m.reply(`*Depositaste ${count} de dinero al Banco.* 🍟`)
      return !0
   }
   if (!Number(args[0])) return m.reply('La cantidad deve ser un Numero.')
   let count = parseInt(args[0])
   if (!user.money) return m.reply('No tienes dinero en la Cartera.')
   if (user.money < count) return m.reply(`Solo tienes ${user.money} de dinero en la Cartera.`)
   user.money -= count * 1
   user.bank += count * 1
   await m.reply(`*Depositaste ${count} de dinero al Banco.* 🍟`)
}

handler.help = ['deposit']
handler.tags = ['economy']
handler.command = ['deposit', 'depositar', 'dep']

export default handler