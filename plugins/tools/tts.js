import gtts from 'node-gtts'
import { readFileSync, unlinkSync } from 'fs'
import { join } from 'path'

const defaultLang = 'es'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!text) return m.reply('Ingresa un Texto.')
    let res = await tts(text, defaultLang)
    await conn.sendFile(m.chat, res, 'tts.opus', null, m, true)
}

handler.help = ['tts']
handler.tags = ['tool']
handler.command = ['tts']

export default handler


function tts(text, lang = 'id') {
   return new Promise((resolve, reject) => {
      try {
         let tts = gtts(lang)
         let filePath = join(global.__dirname(import.meta.url), '../../tmp', 'tts-' + (1 * new Date) + '.wav')
         tts.save(filePath, text, () => {
           resolve(readFileSync(filePath))
           unlinkSync(filePath)
         })
      } catch (e) {
         reject(e)
      }
   })
}
/*
function isLang(_lang) {
   let lang = _lang.toLowerCase();
   return !langs[lang]
}

const langs = {
   'af': 'Afrikaans',
   'sq': 'Albanian',
   'ar': 'Arabic',
   'hy': 'Armenian',
   'ca': 'Catalan',
   'zh': 'Chinese',
   'zh-cn': 'Chinese (Mandarin/China)',
   'zh-tw': 'Chinese (Mandarin/Taiwan)',
   'zh-yue': 'Chinese (Cantonese)',
   'hr': 'Croatian',
   'cs': 'Czech',
   'da': 'Danish',
   'nl': 'Dutch',
   'en': 'English',
   'en-au': 'English (Australia)',
   'en-uk': 'English (United Kingdom)',
   'en-us': 'English (United States)',
   'eo': 'Esperanto',
   'fi': 'Finnish',
   'fr': 'French',
   'de': 'German',
   'el': 'Greek',
   'ht': 'Haitian Creole',
   'hi': 'Hindi',
   'hu': 'Hungarian',
   'is': 'Icelandic',
   'id': 'Indonesian',
   'it': 'Italian',
   'ja': 'Japanese',
   'ko': 'Korean',
   'la': 'Latin',
   'lv': 'Latvian',
   'mk': 'Macedonian',
   'no': 'Norwegian',
   'pl': 'Polish',
   'pt': 'Portuguese',
   'pt-br': 'Portuguese (Brazil)',
   'ro': 'Romanian',
   'ru': 'Russian',
   'sr': 'Serbian',
   'sk': 'Slovak',
   'es': 'Spanish',
   'es-es': 'Spanish (Spain)',
   'es-us': 'Spanish (United States)',
   'sw': 'Swahili',
   'sv': 'Swedish',
   'ta': 'Tamil',
   'th': 'Thai',
   'tr': 'Turkish',
   'vi': 'Vietnamese',
   'cy': 'Welsh'
}
*/