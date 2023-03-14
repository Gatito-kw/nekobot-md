import axios from 'axios'

let handler = async (m, { conn, text }) => {
   let res = await GPT3_Turbo(m.sender, text)
   await m.reply(`${JSON.stringify(res, null, 1)}`)
}

handler.command = ['chatgpt']

export default handler

async function GPT3_Turbo(user, text) {
	try {
		const db = this
		if (!db.messagesIa) db.messagesIa = {};
		if (!db.messagesIa?.[user]) db.messagesIa[user] = [];
		const messages = db.messagesIa?.[user] || [];

	    messages = {
			"role": "user",
			"content": text
		}

		const config = {
			method: 'post',
			url: 'https://api.openai.com/v1/chat/completions',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.Api
			},
			data: JSON.stringify({
				"model": "gpt-3.5-turbo",
				"messages": [
					{
						"role": "system",
						"content": "Seu nome é Neguin Bot!"
					},
					...messages
				]
			})
		};

		const response = await axios(config)
		const responseContent = response.data?.choices?.[0]?.message?.content;

		if (!responseContent) {
			return 'Não foi possivel gerar a resposta.'
		}

		messages = {
			"role": "assistant",
			"content": responseContent
		}

		db.messagesIa[user] = messages;

		return responseContent.trim();
	} catch (e) {
		console.log(e);
		return 'Error interno, tente novamente mais tarde.';
	}
}
