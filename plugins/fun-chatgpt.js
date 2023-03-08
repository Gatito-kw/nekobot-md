import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
   apiKey: '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',
})
const openai = new OpenAIApi(configuration)

let handler = async(m, { conn, text }) => {
   if (!text) return m.reply('Ingresa un texto para interactuar con la inteligencia artificial de Chatgpt.')
   const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0
   })
   await m.reply(`${response.data.choices[0].text}`)
}

handler.help = ['chatgpt']
handler.tags = ['fun']
handler.command = ['chatgpt']

export default handler