import { Events } from "discord.js";
import { useAppStore } from '@/store/app'

export const event = {
    name: Events.InteractionCreate,
    once: false
}

export const execute = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return

    if (interaction.customId == 'selectCmdMenu') {
        let choice = ''

        await interaction.values.forEach(async value => {
            choice += `${value}`
        })

        await interaction.reply({ content: `${choice}` })
    }
}
