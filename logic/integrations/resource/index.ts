import { getLastArticleId, getArticle } from './tradingview'

export async function connect(onNewArticle: (article: object) => any) {
    let lastArticleId = null
    while (true) {
        const article = await getLastArticleId()
        if (article.id !== lastArticleId) {
            lastArticleId = article.id
            const articleContent = await getArticle(article.id)
            onNewArticle({
                ...article,
                content: articleContent
            })
        }
        await new Promise((resolve) => setTimeout(resolve, 5000))
    }
}

connect(console.log)
