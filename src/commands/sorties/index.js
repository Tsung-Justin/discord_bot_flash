import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import Warframe from 'warframe.js'

export const command = new SlashCommandBuilder()
    .setName('sorties')
    .setDescription('Today\'s sorties')

export const execute = async (interaction) => {
    const options = {
        platform: "pc"
    }
    const wf = new Warframe(options)

    await wf.sorties.then(
        sorties => {
            sorties = sorties.missions
            const wfSortiesEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Sorties')
                .setAuthor({
                    name: 'Warframe',
                    iconURL: 'https://i.imgur.com/eVyu9N2.jpg'
                })
                .setDescription('Today\'s sorties')
                .setThumbnail('https://i.imgur.com/eVyu9N2.jpg')
                .addFields(
                    {
                        name: 'Node',
                        value: sorties[0].node,
                        inline: true
                    },
                    {
                        name: 'Type',
                        value: sorties[0].type,
                        inline: true
                    },
                    {
                        name: 'Condition',
                        value: sorties[0].condition,
                        inline: true
                    },
                    {
                        name: '\u200B',
                        value: '\u200B'
                    },
                    {
                        name: 'Node',
                        value: sorties[1].node,
                        inline: true
                    },
                    {
                        name: 'Type',
                        value: sorties[1].type,
                        inline: true
                    },
                    {
                        name: 'Condition',
                        value: sorties[1].condition,
                        inline: true
                    },
                    { name: '\u200B', value: '\u200B' },
                    {
                        name: 'Node',
                        value: sorties[2].node,
                        inline: true
                    },
                    {
                        name: 'Type',
                        value: sorties[2].type,
                        inline: true
                    },
                    {
                        name: 'Condition',
                        value: sorties[2].condition,
                        inline: true
                    })
                .setTimestamp()
                .setFooter({
                    text: 'Some footer text here',
                    iconURL: 'https://i.imgur.com/eVyu9N2.jpg'
                })

            interaction.reply({
                embeds: [wfSortiesEmbed]
            })
        }
    )
}
