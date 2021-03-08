export const convertProductsArrayToCartObject = products => {
  let res = {}
  if (!products.length) return {}
  products.forEach(product => {
    const cartItem = {
      [product.ProductOrder.productId]: product.ProductOrder.quantity
    }
    res = {...res, ...cartItem}
  })
  return res
}
