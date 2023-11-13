import { Client, Events, GatewayIntentBits } from 'discord.js'
import { loadCommands } from "@/core/loader"
import dotenv from 'dotenv'
import vueInit from '@/core/vue'
import { useAppStore } from '@/store/app'
import { loadEvents } from './core/loader'

dotenv.config()
vueInit()
loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const appStore = new useAppStore()
appStore.Client = client

loadEvents(client)

client.login(process.env.TOKEN)
