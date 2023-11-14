import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import Warframe from 'warframe.js'

const toString = (str) => {
    return JSON.stringify(str)
}

export const command = new SlashCommandBuilder()
    .setName('trader')
    .setDescription('Void trader information.')

export const execute = async (interaction) => {
    const options = {
        platform: "pc"
    }
    const wf = new Warframe(options)

    await wf.voidTrader.then(
        voidTrader => {
            const re = /(\d.+)T(\d.+)(?:.000)/g
            const from = toString(voidTrader.from)
            const timeArray = re.exec(from)
            const date = timeArray[1]
            const fromTime = timeArray[2]
            const wfVoidTraderEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(voidTrader.name)
                .setAuthor({
                    name: 'Warframe',
                    iconURL: 'https://i.imgur.com/eVyu9N2.jpg'
                })
                .setDescription('Void Trader information')
                .setThumbnail('https://i.imgur.com/eVyu9N2.jpg')
                .addFields(
                    {
                        name: 'Active',
                        value: toString(voidTrader.active)[0].toUpperCase() + toString(voidTrader.active).slice(1),
                        inline: true
                    },
                    {
                        name: 'From',
                        value: `${date} ${fromTime.replace(fromTime.slice(0, 2), Number(fromTime.slice(0, 2)) + 8)}`,
                        inline: true
                    },
                    {
                        name: 'FromString',
                        value: voidTrader.fromString,
                    })
                .setTimestamp()
                .setFooter({
                    text: 'Some footer text here',
                    iconURL: 'https://i.imgur.com/eVyu9N2.jpg'
                })

            interaction.reply({
                embeds: [wfVoidTraderEmbed]
            })
        }
    )
}
