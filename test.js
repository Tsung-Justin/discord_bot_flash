// Test function files
import Warframe from 'warframe.js'

const options = {
    platform: "pc"
}
const wf = new Warframe(options)

wf.sorties.then(
    sorties => {

        sorties = sorties.missions
        console.log(sorties[0])
        /* sorties
        {
          node: 'Unda (Venus)',
          type: 'Interception',
          condition: 'Energy Reduction',
          conditionDescription: 'Maximum Warframe Energy capacity is quartered. Energy Siphon is less effective.'
        }
        */

        // for (const sortie of sorties) {

        // }
    }
)
