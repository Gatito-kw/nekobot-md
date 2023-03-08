import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`*Ingrese el nombre de un repositorio de github*\n\n- Ejemplo: ${usedPrefix + command} lolibot`)
    let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
        q: text
    }))
    let json = await res.json()
    if (res.status !== 200) throw json
    let str = json.items.map((repo, index) => {
        return `
*• 🍟 Resultado:* ${1 + index}
*• 📦 Link:* ${repo.html_url}
*• 🏵️ Creador:* ${repo.owner.login}
*• 🐣 Nombre:* ${repo.name}
*• 📅 Creado:* ${formatDate(repo.created_at)}
*• ⏰ Actualizado:* ${formatDate(repo.updated_at)}
*• 👁 Visitas:* ${repo.watchers}
*• 🍴 Bifurcado:* ${repo.forks}
*• ⭐ Estrellas:* ${repo.stargazers_count}
*• 🧩 Issues:* ${repo.open_issues}
*• 🎐 Descripción:* ${repo.description ? `${repo.description}` : 'Sin Descripción'}
*• ♻️ Clone:* ${repo.clone_url}
`.trim()
   }).join('\n\n─────────────────\n\n')
   await conn.sendFile(m.chat, json.items[0].owner.avatar_url, 'githubsearch.jpg', `\t\t*‧ [ 🔎 Github Busqueda 🔎 ] ‧*\n\n─────────────────\n\n${str}`, m)
}

handler.help = ['githubsearch']
handler.tags = ['search']
handler.command = ['githubsearch']

export default handler

function formatDate(n, locale = 'es') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
