import axios from 'axios'
import fs from 'fs'

export function percentBetweenValues(entry_price, current_price) {
	return (current_price - entry_price) / entry_price * 100
}

/**
 * @param {Object} coins
 */
export async function getDataFromMarket(config) {
	const coins = Object.keys(config.coins)

	let symbol = ''
	for (const coin of coins) {
		symbol += coin + ','
	}
	symbol = symbol.slice(0, -1)

	const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`
	const headers = {
		'Content-Type': 'application/json',
		'X-CMC_PRO_API_KEY': config.key
	}

	let data

	if (config.debug) {
		data = await fs.promises.readFile('mock.json', 'utf-8')
		data = JSON.parse(data)
	}
	else {
		const response = await axios.get(url, {
			headers
		})
		data = await response.data
	}

	return data
}

/**
 *
 * @param {Object} data
 */
export function filterData(data) {

	const result = {}

	data = Object.values(data)
	data = data[1]
	data = Object.values(data)

	for (const coin of data) {

		const key = coin.symbol
		const value = coin.quote.USD.price

		result[key] = value
	}

	return result
}

/**
 * @param {Object} config
 * @param {Object} data
 */
export function getProgress(config, data) {

	console.log('Latest')

	const coins = Object.entries(config.coins)
	for (const [coin_key, coin_value] of coins) {

		console.log(`${coin_key}: ${data[coin_key]}`)
		//console.log(coin_value)

		const percent_array = []
		for (const entry of coin_value) {
			const progress = percentBetweenValues(entry, data[coin_key])

			const o = {}
			o[entry] = progress

			percent_array.push(o)

		}
		console.log(percent_array)
		console.log("\n")
	}
	console.log('-----------------------')
	console.log("\n")
}
