import axios from 'axios'

import { article } from '../../types/telegram/common'

const tradingview = axios.create({
    baseURL: 'https://news-headlines.tradingview.com/v2/'
})

function jsonToArticle(json: any): string {
    const texts = []

    if (json.children) {
        for (const child of json.children) {
            if (typeof child === 'string' || child instanceof String) {
                texts.push(child)
            } else {
                texts.push(jsonToArticle(child))
            }
        }
    }

    return texts.join('\n')
}

export async function getArticle(id: string): Promise<string> {
    const response = await tradingview.get(`/story`, {
        params: {
            id,
            lang: 'en'
        }
    })

    return jsonToArticle(response.data.astDescription)
}

export async function getArticles(): Promise<article[]> {
    const response = await tradingview.get(`/headlines`, {
        params: {
            category: 'base',
            lang: 'en',
            client: 'overview'
        }
    })

    return response.data.items.map((item: any) => {
        return {
            id: item.id,
            title: item.title,
            link: `https://www.tradingview.com${item.storyPath}`
        }
    })
}

export async function getLastArticle(): Promise<article> {
    const articles = await getArticles()
    return articles[0]
}
