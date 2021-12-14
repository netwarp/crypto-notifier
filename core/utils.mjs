export function percentBetweenValues(entry_price, current_price) {
	return  100 * Math.abs( ( entry_price - current_price ) / ( (entry_price + current_price)/2 ) )
}

