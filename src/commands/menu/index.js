import {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ComponentType
} from 'discord.js'

export const command = new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Void trader information.')

export const execute = async (interaction) => {
    const pets = [
        {
            label: 'Dog',
            description: 'This is a dog!',
            value: 'dog',
            emoji: '🐱'
        },
        {
            label: 'Cat',
            description: 'This is a cat!',
            value: 'cat',
            emoji: '🐶'
        }
    ]

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('selectCmdMenu')
        .setPlaceholder('Make a selection...')
        .addOptions(
            pets.map((pet) => {
                return new StringSelectMenuOptionBuilder()
                    .setLabel(pet.label)
                    .setDescription(pet.description)
                    .setValue(pet.value)
                    .setEmoji(pet.emoji)
            })
        )
    const actionRow = new ActionRowBuilder().addComponents(selectMenu)
    await interaction.reply({
        content: 'Choose your starter!',
        components: [actionRow]
    })
}
