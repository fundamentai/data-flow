import { sendMessage } from '../../integrations/telegram'
import { fundementai } from '../../integrations/gpt-connector'

export class ChannelLogic {
    static async analyze(params: any) {
        const response = JSON.stringify(await fundementai(params))
        await sendMessage(response)
        return response
    }
}
