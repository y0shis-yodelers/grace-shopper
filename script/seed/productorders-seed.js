const getPricePaid = () => {
  return Math.ceil(Math.random() * 10000)
}

const getQuantity = () => {
  return Math.ceil(Math.random() * 100)
}

const getOrderPK = () => {
  const value = Math.random()
  return value > 0.5 ? 1 : 2
}

const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const getProductPK = () => {
  return productIds[Math.floor(Math.random() * productIds.length)]
}

const buildProductOrder = () => {
  return {
    pricePaid: getPricePaid(),
    quantity: getQuantity(),
    orderId: getOrderPK(),
    productId: getProductPK()
  }
}

module.exports = new Array(5).fill(null).map(() => buildProductOrder())
