function percentBetweenValues(entry_price, current_price) {
    return (current_price - entry_price) / entry_price * 100
}


console.log(percentBetweenValues(90, 50))