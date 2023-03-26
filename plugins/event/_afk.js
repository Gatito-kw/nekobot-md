import db from '../../lib/database.js'

export async function before(m) {
    let user = db.data.users[m.sender]
    if (user.afk > 0) {
        await m.reply(`🚩 @${m.sender.split`@` [0]} dejaste de estar AFK despues de *${(new Date - user.afk).toTimeString()}*.`, false, { mentions: [m.sender] })
        user.afk = 0
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        await m.reply(`🚩 El usuario @${jid.split`@` [0]} esta AFK por la razón *${reason ? reason : '...'}* durante *${(new Date - afkTime).toTimeString()}*.`, false, { mentions: [m.sender] })
    }
    return true
}