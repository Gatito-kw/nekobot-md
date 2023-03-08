import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {
    if (!text) return m.reply('Ingresa un texto para interactuar con la inteligencia artificial de Chatgpt.')
    let res = await openAi(text)
    await m.reply(JSON.stringify(res, null, 1))
    // await m.reply(`${res?.choices[0]?.text.trim()}`).catch(e => m.reply(JSON.stringify(res, null, 1)))
}

handler.help = ['chatgpt']
handler.tags = ['fun']
handler.command = ['chatgpt']

export default handler

async function openAi(text) {
    let result = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': text,
            'temperature': 0.5,
            'max_tokens': 3000,
            'top_p': 1,
        })
    })
    return await result.json()
}