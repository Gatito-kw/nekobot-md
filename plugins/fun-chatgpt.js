import axios from 'axios'

let handler = async(m, { conn, text }) => {
   if (!text) return m.reply('Ingresa un texto para interactuar con la inteligencia artificial de Chatgpt.')
   let res = await openAi(text)
   await m.reply(`${JSON.stringify(anu, null, 1)}`)
}

handler.help = ['chatgpt']
handler.tags = ['fun']
handler.command = ['chatgpt']

export default handler

async function openAi(text) {
   const { data, status } = await axios.post('https://api.openai.com/v1/completions', {
      text,
      model: 'text-davinci-003',
      max_tokens: 500,
      temperature: 0,
      stream: false
   }, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer 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'
      }
   })
   if (status !== 200) throw new Error('Opps error!')
   return data
  } catch (err) {
   return err.message
  }
}