import db from '../../lib/database.js'

const cooldown = 18000000 // 5 Horas

let handler = async (m, { conn, usedPrefix, command }) => {
   let user = db.data.users[m.sender]
   let amount = Math.floor(Math.random() * (100 - 200) + 200) + 1
   let time = user.lastwork + cooldown
   if (new Date - user.lastwork < cooldown) return m.reply(`Espera *${(time - new Date()).toTimeString()}* para volver a Trabajar.`)
   let work = works.getRandom()
   user.money += amount
   user.lastwork = new Date * 1
   await m.reply(`🚩 ${work} ${amount} de Dinero.`)
}

handler.help = ['work']
handler.tags = ['economy']
handler.command = ['work', 'trabajar']

export default handler

// Thanks to FG98
const works = [
   "Trabajas como cortador de galletas y ganas",
   "Trabaja para una empresa militar privada, ganando",
   "Organiza un evento de cata de vinos y obtienes",
   "Limpias la chimenea y encuentras",
   "Desarrollas juegos para ganarte la vida y ganas",
   "Trabajaste en la oficina horas extras por",
   "Trabajas como secuestrador de novias y ganas",
   "Alguien vino y representó una obra de teatro. Por mirar te dieron",
   "Compraste y vendiste artículos y ganaste",
   "Trabajas en el restaurante de la abuela como cocinera y ganas",
   "Trabajas 10 minutos en un Pizza Hut local. Ganaste",
   "Trabajas como escritor(a) de galletas de la fortuna y ganas",
   "Revisas tu bolso y decides vender algunos artículos inútiles que no necesitas. Resulta que toda esa basura valía",
   "Desarrollas juegos para ganarte la vida y ganas",
   "Trabajas todo el día en la empresa por",
   "Diseñaste un logo para una empresa por",
   "¡Trabajó lo mejor que pudo en una imprenta que estaba contratando y ganó su bien merecido!",
   "Trabajas como podador de arbustos y ganas",
   "Trabajas como actor de voz para Bob Esponja y te las arreglaste para ganar",
   "Estabas cultivando y Ganaste",
   "Trabajas como constructor de castillos de arena y ganas",
   "Trabajas como artista callejera y ganas",
   "¡Hiciste trabajo social por una buena causa! por tu buena causa Recibiste",
   "Reparaste un tanque T-60 averiado en Afganistán. La tripulación te pagó",
   "Trabajas como ecologista de anguilas y ganas",
   "Trabajas en Disneyland como un panda disfrazado y ganas",
   "Reparas las máquinas recreativas y recibes",
   "Hiciste algunos trabajos ocasionales en la ciudad y ganaste",
   "Limpias un poco de moho tóxico de la ventilación y ganas",
   "Resolviste el misterio del brote de cólera y el gobierno te recompensó con una suma de",
   "Trabajas como zoólogo y ganas",
   "Vendiste sándwiches de pescado y obtuviste",
   "Reparas las máquinas recreativas y recibes",
] 