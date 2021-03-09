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

// helper sets local state quantity field
// by checking localStorage for current value of cart
export function getQuantityFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart) return 0
  if (cart && !cart[productId]) return 0
  return cart[productId]
}

export function totals(products) {
  let totalQuantity = 0,
    totalPrice = 0

  products.forEach(product => {
    totalQuantity += product.ProductOrder.quantity
    totalPrice += product.ProductOrder.pricePaid
  })

  return {totalQuantity, totalPrice}
}
