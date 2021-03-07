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

// takes in an order and defaults to an object with an empty products array
// outputs a cart: { productId : quantity ... }
export const reduceOrderToGetPastCart = (order = {products: []}) => {
  let res = {}
  const {products} = order

  // if no products, return empty object ( {} )
  if (!products.length) return {}

  products.forEach(product => {
    const cartItem = {
      [product.ProductOrder.productId]: product.ProductOrder.quantity
    }
    res = {...res, ...cartItem}
  })
  return res
}
