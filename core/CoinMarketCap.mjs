import axios from 'axios'
import toml from 'toml'
import fs from 'fs'
let config = await fs.promises.readFile('config.toml', 'utf-8')
config = toml.parse(config)

class CoinMarketCap {

	/**
	 *
	 * @param {Array} coins
	 */
	constructor(coins, debug = 0) {
		this.coins = coins
		this.data = {}

	}

	async request() {

		let symbols = ''
		for (let coin of this.coins) {
			symbols += coin + ','
		}
		symbols = symbols.slice(0, -1)

		const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`
		let data

		if (config.debug) {
			data = await fs.promises.readFile('mock.json', 'utf-8')
			data = JSON.parse(data)
		}
		else {
			const response = await axios.get(url, {
				headers: {
					'Content-Type': 'application/json',
					'X-CMC_PRO_API_KEY': config.key
				}
			})
			data = await response.data
		}

		this.data = data

		return this.getPrices()
	}

	getPrices() {
		if (this.data.status.error_code) {
			console.log('Error')
			return
		}

		const tick = {}

		for (const [coin, value] of Object.entries(this.data.data)) {
			tick[coin] = value.quote.USD.price
		}

		return tick
	}
}

export default CoinMarketCap