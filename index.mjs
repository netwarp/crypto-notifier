import toml from 'toml'
import fs from 'fs'

import CoinMarketCap from './core/CoinMarketCap.mjs'
import Notifier from './core/Notifier.mjs'

async function main() {

    let config = await fs.promises.readFile('config.toml', 'utf-8')
    config = toml.parse(config)

    const debug = config.debug
    const coins = config.coins

    let coins_array = Object.keys(config.coins)

    const coin_market_cap = new CoinMarketCap(coins_array, debug)
    const tick = await coin_market_cap.request()

    const notifier = new Notifier(tick, coins)

}

await main()


