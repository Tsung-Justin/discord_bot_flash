import { Events } from "discord.js";
import { useAppStore } from '@/store/app'

export const event = {
    name: Events.InteractionCreate,
    once: false
}

export const execute = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return

    if (interaction.customId == 'selectCmdMenu') {
        const appStore = new useAppStore()
        const command = appStore.commandsExectionMap.get(interaction.values[0])

        await command(interaction)
    }
}
