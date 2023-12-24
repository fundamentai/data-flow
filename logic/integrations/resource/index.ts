import { getLastArticleId, getArticle } from './tradingview'
getArticle
export async function connect(onNewArticle: (article: string) => any) {
    let lastArticleId = null
    while (true) {
        const articleId = await getLastArticleId()
        if (articleId !== lastArticleId) {
            lastArticleId = articleId
            onNewArticle(await getArticle(articleId))
        }

        await new Promise((resolve) => setTimeout(resolve, 5000))
    }
}
