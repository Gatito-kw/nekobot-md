import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
   organization: 'org-pHcQAj5wjFIpcdkfmpFePVqF',
   apiKey: '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',
})
const openai = new OpenAIApi(configuration)

let handler = async(m, { conn, text }) => {
   if (!text) return m.reply('Ingresa un texto para interactuar con la inteligencia artificial de Chatgpt.')
   const res = await openai.createCompletion({ model: "text-davinci-003", prompt: text, temperature: 0, max_tokens: 3000, stop: ["Ai:", "Human:"], top_p: 1, frequency_penalty: 0.2, presence_penalty: 0 })
   await m.reply(res.data.choices[0].text.trim())
}

handler.help = ['chatgpt']
handler.tags = ['fun']
handler.command = ['chatgpt']

export default handler