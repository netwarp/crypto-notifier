import toml from 'toml'
import fs from 'fs'

import {
    getDataFromMarket,
    filterData,
    getProgress
} from './core/utils.mjs'

async function main() {

    let config = await fs.promises.readFile('config.toml', 'utf-8')
    config = toml.parse(config)

    let data = await getDataFromMarket(config)
    data = filterData(data)

    getProgress(config, data)
}
await main()
setInterval(main, 1000 * 60 * 60)


