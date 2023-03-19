import db from '../../lib/database.js'

const cooldown = 30000 // 30 Segundos

let handler = async (m, { conn, args, usedPrefix, command }) => {
   let today = new Date()
   if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0) {
      let user = db.data.users[m.sender]
      global.game.slot = global.game.slot ? global.game.slot : {}
      let time = global.game.slot[m.sender] + cooldown
      if (new Date - time < cooldown) return m.reply(`🧭 Espera *${(time - new Date()).toTimeString()}* para volver a Jugar.`)
      let emojis = ['🍌', '🍉', '🍇']
      let a = Math.floor(Math.random() * emojis.length)
      let b = Math.floor(Math.random() * emojis.length)
      let c = Math.floor(Math.random() * emojis.length)
      let x = [],
         y = [],
         z = []
      for (let i = 0; i < 3; i++) {
         x[i] = emojis[a]
         a++
         if (a == emojis.length) a = 0
      }
      for (let i = 0; i < 3; i++) {
         y[i] = emojis[b]
         b++
         if (b == emojis.length) b = 0
      }
      for (let i = 0; i < 3; i++) {
         z[i] = emojis[c]
         c++
         if (c == emojis.length) c = 0
      }
      let end
      if (a == b && b == c) {
         end = `Ganaste 🎉!\n+ *$ 150*`
         user.money += 150
      } else if (a == b || a == c || b == c) {
         end = `Casi lo logras!\n+ *$ 50*`
         user.money += 50
      } else {
         end = `Perdiste!\n- *$ 30*`
         user.money -= 30
      }
      global.game.slot[m.sender] = new Date * 1
      await m.reply(`🎰 *SLOTS* 🎰\n──────\n${x[0]} : ${y[0]} : ${z[0]}\n${x[1]} : ${y[1]} : ${z[1]}\n${x[2]} : ${y[2]} : ${z[2]}\n──────\n${end}`)
   } else m.reply('Este juego solo puede ser jugado los fines de Semana.')
}

handler.help = ['slot']
handler.tags = ['economy']
handler.command = ['slot']

export default handler