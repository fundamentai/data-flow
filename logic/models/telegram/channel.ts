import { sendMessage } from '../../integrations/telegram'
import { fundementai } from '../../integrations/gpt-connector'

export class ChannelLogic {
    static async analyze(params: any) {
        const response = await fundementai({
            content: params.content,
            title: params.title
        } as any)

        return response.result.message.content
    }

    static async sendTelegram(params: any) {
        const analyze = JSON.parse(await ChannelLogic.analyze(params))

        let title = `*${params.title}*`
        let analysis = `*AI Fundemental Analysis*\n${analyze['fundamental-analysis']}`
        let score = `*Score*: ${(analyze.score > 0 ? '🟩' : '🟥').repeat(Math.abs(analyze.score))}`
        let link = `*Source*: ${params.link}`

        let message = `${title}\n\n${analysis}\n\n${score}\n\n${link}`

        if (message.length > 4096) {
            message = message.slice(0, 4096)
        }

        return await sendMessage(message)
    }
}
