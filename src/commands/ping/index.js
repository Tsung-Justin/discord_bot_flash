import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong')

export const execute = async (interaction) => {
    await interaction.reply('pong!')
}
