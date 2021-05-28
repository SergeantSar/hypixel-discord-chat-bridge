const chalk = require('chalk')

class StateHandler {
  constructor(discord) {
    this.discord = discord
  }

  async onReady() {
    console.log(chalk.green('Discord client ready, logged in as ' + this.discord.client.user.tag))
    this.discord.client.user.setActivity('Guild Chat', { type: 'WATCHING' })

    if (this.discord.app.config.discord.messageMode == 'webhook') {
      this.discord.webhooks = {
        guild: await getWebhook(this.discord, 'guild'),
        officer: await getWebhook(this.discord, 'officer')
      }
    }

    ['guild', 'officer'].forEach(type => {
      this.discord.client.channels.fetch(this.discord.app.config.discord.channels[type]).then(channel => {
        channel.send({
          embed: {
            author: { name: `Chat Bridge is Online` },
            color: '7CFC00'
          }
        })
      })
    })
  }

  onClose() {
    this.discord.client.channels.fetch(this.discord.app.config.discord.channels.guild).then(channel => {
      channel.send({
        embed: {
          author: { name: `Chat Bridge is Offline` },
          color: 'DC143C'
        }
      })
    }).then(() => {
      this.discord.client.channels.fetch(this.discord.app.config.discord.channels.officer).then(channel => {
        channel.send({
          embed: {
            author: { name: `Chat Bridge is Offline` },
            color: 'DC143C'
          }
        })
      })
    }).then(() => { process.exit() }).catch(process.exit())
  }
}

async function getWebhook(discord, channelType) {
  let channel = discord.client.channels.cache.get(discord.app.config.discord.channels[channelType])
  let webhooks = await channel.fetchWebhooks()
  if (webhooks.first()) {
    return webhooks.first()
  } else {
    var res = await channel.createWebhook(discord.client.user.username, {
      avatar: discord.client.user.avatarURL(),
    })
    return res
  }
}

module.exports = StateHandler
