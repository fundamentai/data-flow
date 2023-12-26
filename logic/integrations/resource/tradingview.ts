import axios from 'axios'

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

export async function getArticle(id: string) {
    const response = await tradingview.get(`/story`, {
        params: {
            id,
            lang: 'en'
        }
    })
    const json = response.data
    const article = jsonToArticle(json.astDescription)
    return article
}

export async function getArticles() {
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

export async function getLastArticleId() {
    const articles = await getArticles()
    return articles[0]
}
