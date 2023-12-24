import axios from 'axios'
import { config } from '../../config'

const gptConnector = axios.create({
    baseURL: config.GPT_CONNECTOR
})

export async function fundementai(article: string, question: string = 'This article how effect the stock prices') {
    const response = await gptConnector.post(
        '/openai/continueCompletion',
        {
            message: {
                content: JSON.stringify({
                    article,
                    question
                }),
                role: 'user'
            },
            openaiConfig: {
                max_tokens: 4096
            }
        },
        {
            params: {
                systemKey: config.MODULE_NAME
            }
        }
    )

    return response.data
}
