import { ChannelLogic } from './logic/models/telegram/channel'
import { connect } from './logic/integrations/resource'

connect(ChannelLogic.sendTelegram)
