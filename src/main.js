import { Client, Events, GatewayIntentBits } from 'discord.js'
import { loadCommands } from "@/core/loader"
import dotenv from 'dotenv'
import vueInit from '@/core/vue'
import { useAppStore } from '@/store/app'

dotenv.config()
vueInit()
loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const appStore = new useAppStore()
appStore.Client = client

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(process.env.TOKEN)
