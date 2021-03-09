// convert price in pennies to formatted price in dollars, cents
// ex., 780 -> $7.80 : 55 -> $0.55 : 9 -> $0.09
export function formatPrice(price) {
  price = Math.round(price)
  if (price < 10) return `$0.0${price}`
  if (price < 100) return `$0.${price}`
  let priceArray = [...String(price)]
  priceArray.splice(priceArray.length - 2, 0, '.')
  const formattedPrice = priceArray.join('')
  return `$${formattedPrice}`
}

export function getQuantityFromCart(cart, productId) {
  const foundProduct = cart.filter(product => product.id === productId)[0]
  return foundProduct.ProductOrder.quantity
}
