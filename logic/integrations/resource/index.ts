import { getLastArticle, getArticle } from './tradingview'
import { article } from '../../types/telegram/common'

export async function connect(onNewArticle: (article: article) => any) {
    let lastArticleId = null
    while (true) {
        try {
            const article = await getLastArticle()
            if (article.id !== lastArticleId) {
                lastArticleId = article.id
                const articleContent = await getArticle(article.id)
                await onNewArticle({
                    ...article,
                    content: articleContent
                })
            }
        } catch (err) {
            console.log(err)
        }
        await new Promise((resolve) => setTimeout(resolve, 5000))
    }
}
