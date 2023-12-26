import axios from 'axios'
import { config } from '../../config'
import { article } from '../types/telegram/common'

const gptConnector = axios.create({
    baseURL: config.GPT_CONNECTOR
})

export async function fundementai(article: article) {
    let strContent = JSON.stringify(article)

    const response = await gptConnector.post(
        '/openai/continueCompletion',
        {
            message: {
                content: strContent,
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
