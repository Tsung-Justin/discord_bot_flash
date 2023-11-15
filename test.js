// Test function files
import Warframe from 'warframe.js'
import fg from 'fast-glob'

// const options = {
//     platform: "pc"
// }
// const wf = new Warframe(options)

// const sortiesContent = wf.sorties.then(
//     sorties => {
//         sorties = sorties.missions
//         sorties.map(
//             sortie => {
//                 sortie.node, sortie.type, sortie.condition
//             }
//         )
//     })

const files = await fg('./src/commands/**/index.js')
const commands = []

for (const file of files) {
    const cmdInformation = await import(file)
    commands.push({ 'name': cmdInformation.command.name, 'description': cmdInformation.command.description })
    // commands[cmdInformation.command.name] = cmdInformation.command.description
    // if (cmdInformation.command.name != 'menu') {
    //     commands.push(cmdInformation.command.description)
    // }
}

commands.map(command => {
    console.log(`Name: ${command.name}, Description: ${command.description}`)
})
