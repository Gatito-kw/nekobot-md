import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'

let handler = async (m, { conn, text }) => {
   if (!text) return m.reply('Ingresa un Texto.')
   let styles = Object.entries(await stylizeText(text)).map(([name, value]) => `*${name}*\n${value}`).join`\n\n`
   await m.reply(styles)
}

handler.help = ['styletext']
handler.tags = ['tool']
handler.command = ['styletext']

export default handler

async function stylizeText(text) {
   let res = await fetch('http://qaz.wtf/u/convert.cgi?text=' + encodeURIComponent(text))
   let html = await res.text()
   let dom = new JSDOM(html)
   let table = dom.window.document.querySelector('table').children[0].children
   let obj = {}
   for (let tr of table) {
      let name = tr.querySelector('.aname').innerHTML
      let content = tr.children[1].textContent.replace(/^\n/, '').replace(/\n$/, '')
      obj[name + (obj[name] ? ' Reversed' : '')] = content
   }
   return obj
}