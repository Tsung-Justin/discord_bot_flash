// Test function files
import { time } from 'discord.js'
import Warframe from 'warframe.js'

const options = {
    platform: "pc"
}
const wf = new Warframe(options)

wf.voidTrader.then(
    voidTrader => {
        const re = /(\d.+)T(\d.+)(?:.000)/g
        const from = JSON.stringify(voidTrader.from)
        const timeArray = re.exec(from)
        const date = timeArray[1]
        const fromTime = timeArray[2]

        console.log(fromTime.replace(fromTime.slice(0, 2), Number(fromTime.slice(0, 2)) + 8))
        /*{
            id: '5d1e07a0a38e4a4fdd7cefca',
            from: 2023 - 11 - 17T13:00:00.000Z,
            until: 2023 - 11 - 19T13:00:00.000Z,
            name: "Baro Ki'Teer",
            relay: 'Kronia Relay (Saturn)',
            goodies: [],
            active: false,
            fromString: "Baro Ki'Teer arrives in 3d 1h 18m 3s",
            untilString: "Baro Ki'Teer leaves in 5d 1h 18m 3s"
        }*/
    }
)
