const getIsPaid = () => {
  const value = Math.random()
  return value > 0.5
}

const getPricePaid = () => {
  return Math.ceil(Math.random() * 10000)
}

const getQuantity = () => {
  return Math.ceil(Math.random() * 100)
}

const getUserPK = () => {
  return Math.ceil(Math.random() * 10)
}

const getProductOrdersPK = () => {
  const value = Math.random()
  return value > 0.5 ? 1 : 2
}

const buildOrder = () => {
  return {
    isPaid: getIsPaid(),
    pricePaid: getPricePaid(),
    quantity: getQuantity(),
    userId: getUserPK()
    // productordersId: getProductOrdersPK(),
  }
}

module.exports = new Array(10).fill(null).map(() => buildOrder())
