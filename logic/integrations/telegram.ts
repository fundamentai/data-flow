import TelegramBot from 'node-telegram-bot-api'
import { config } from '../../config'

export const bot = new TelegramBot(config.BOT_TOKEN)

export async function sendMessage(message: string) {
    return await bot.sendMessage('@fundementai', message)
}
