import {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
} from 'discord.js'
import fg from 'fast-glob'

const commands = []
const files = await fg('./src/commands/**/index.js')
const getCommands = async () => {
    for (const file of files) {
        const cmdInformation = await import(file)

        if (cmdInformation.command.name != 'menu') {
            commands.push({
                label: cmdInformation.command.name,
                description: cmdInformation.command.description,
                value: cmdInformation.command.name
            })
        }
    }
}

getCommands()

export const command = new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Void trader information.')

export const execute = async (interaction) => {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('selectCmdMenu')
        .setPlaceholder('Make a selection...')
        .addOptions(
            commands.map((cmd) => {
                return new StringSelectMenuOptionBuilder()
                    .setLabel(cmd.label)
                    .setDescription(cmd.description)
                    .setValue(cmd.value)
            })
        )
    const actionRow = new ActionRowBuilder().addComponents(selectMenu)

    await interaction.reply({
        content: 'Choose your starter!',
        components: [actionRow]
    })
}
