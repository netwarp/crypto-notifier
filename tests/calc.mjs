function percentBetweenValues(entry_price, current_price) {
    return (current_price - entry_price) / entry_price * 100
}

function formatDate() {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${new Date().toLocaleDateString()} ${hour}:${minute}:${second}`
}

console.log(formatDate())
//console.log(percentBetweenValues(90, 50))