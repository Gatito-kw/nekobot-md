import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {
    if (!text) return m.reply('Ingrese un texto para hablar con la inteligencia artificial de chatgpt')
    let res = await openAi(text)
    await m.reply(`${JSON.stringify(res, null, 1)}`)
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
            'model': 'gpt-3.5-turbo',
            'messages': [{
               'role': 'user',
               'content': 'Hello!',
            }]
    
        })
    })
    return await result.json()
}