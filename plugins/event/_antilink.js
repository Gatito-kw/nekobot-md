import db from '../../lib/database.js'

const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, { isAdmin, isBotAdmin }) {
   if (m.isBaileys && m.fromMe)
      return !0
   if (!m.isGroup)
      return !1
   let chat = db.data.chats[m.chat]
   let bot = db.data.settings[this.user.jid] || {}
   const isGroupLink = linkRegex.exec(m.text)
   this.spamlink = this.spamlink ? this.spamlink : {}
   if (this.spamlink[m.sender] == undefined) this.spamlink[m.sender] = false
   if (chat.antiLink && isGroupLink && !isAdmin) {
      if (isBotAdmin) {
         const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
         if (m.text.includes(linkThisGroup)) return !0
      }
      if (!this.spamlink[m.sender]) await m.reply(`Enlace detectado de *@${m.sender.split`@`[0]}*, en este grupo está prohibido enviar enlaces de grupos de *WhatsApp* serás eliminado del Grupo.`, false, { mentions: [m.sender] })
      this.spamlink[m.sender] = true
      if (isBotAdmin) {
         await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      }
   }
}