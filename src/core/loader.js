import { REST, Routes, Collection } from 'discord.js'
import fg from 'fast-glob'
import { useAppStore } from "@/store/app"

const updateSlashCommands = async (commands) => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)

        const rest = new REST({ version: 10 }).setToken(process.env.TOKEN)
        const result = await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands,
            }
        )

        console.log(`Successfully reload ${result.length} application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
}

export const loadCommands = async () => {
    try {
        const commands = []
        const appStore = useAppStore()
        const executes = new Collection()
        const files = await fg('./src/commands/**/index.js')

        for (const file of files) {
            const cmdInformation = await import(file)
            commands.push(cmdInformation.command)
            executes.set(cmdInformation.command.name, cmdInformation.execute)
        }

        await updateSlashCommands(commands)
        appStore.commandsExectionMap = executes

    } catch (error) {
        console.error(error)
    }
}

export const loadEvents = async (client) => {
    const files = await fg('./src/events/**/index.js')

    try {
        for (const file of files) {
            const eventInformation = await import(file)

            if (eventInformation.event.once) {
                client.once(
                    eventInformation.event.name,
                    eventInformation.execute
                )
            } else {
                client.on(
                    eventInformation.event.name,
                    eventInformation.execute
                )
            }
        }
    } catch (error) {
        console.error(error)
    }
}
