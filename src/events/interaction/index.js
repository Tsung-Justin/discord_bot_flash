import { Events } from "discord.js";
import { useAppStore } from '@/store/app'

export const event = {
    name: Events.InteractionCreate,
    once: false
}

export const execute = async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const appStore = new useAppStore()
    const command = appStore.commandsExectionMap.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)

        return
    }

    try {
        await command(interaction)
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`)
        console.error(error)
    }
}
