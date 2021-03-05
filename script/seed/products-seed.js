const names = [
  'fender all-star',
  'the enforcer',
  'pygmalion',
  'alice',
  'earl skuggs special',
  'serenity',
  'red ranger',
  'seagull fodder',
  'pickenator',
  'pickle (made from real pickles)'
]

const description =
  'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'

const imageUrls = [
  'https://imgur.com/zNwEcoz.jpg',
  'https://imgur.com/HSoWZKP.jpg',
  'https://imgur.com/2rjFQzW.jpg',
  'https://imgur.com/qHp9pGM.jpg',
  'https://imgur.com/IPqMPS2.jpg',
  'https://imgur.com/R0es16f.jpg',
  'https://imgur.com/lLRA4PS.jpg',
  'https://imgur.com/dD98UxJ.jpg',
  'https://imgur.com/RSJYKkU.jpg',
  'https://imgur.com/zFep5xB.jpg',
  'https://imgur.com/2Lmtth8.jpg',
  'https://imgur.com/jEMFIfp.jpg',
  'https://imgur.com/BcRJTDC.jpg',
  'https://imgur.com/AZykHw6.jpg',
  'https://imgur.com/d1bKrKl.jpg',
  'https://imgur.com/BcXqhYJ.jpg',
  'https://imgur.com/K4aociq.jpg',
  'https://imgur.com/DqsCTxx.jpg',
  'https://imgur.com/BBpnehF.jpg',
  'https://imgur.com/bkMqn0q.jpg',
  'https://imgur.com/8MbJwJU.jpg',
  'https://imgur.com/bSldLGC.jpg',
  'https://imgur.com/qcN9X8V.jpg',
  'https://imgur.com/kywOQ1s.jpg',
  'https://imgur.com/vMp.jpg567e'
]

const inventoryValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const getPrice = () => {
  const min = Math.ceil(1)
  const max = Math.floor(1000)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getProductOrdersPK = () => {
  const value = Math.random()
  return value > 0.5 ? 1 : 2
}

const buildProduct = () => {
  const product = {
    name: names[Math.floor(Math.random() * names.length)],
    description: description,
    imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
    inventory:
      inventoryValues[Math.floor(Math.random() * inventoryValues.length)],
    price: getPrice()
    // productordersId: getProductOrdersPK(),
  }

  return product
}

module.exports = new Array(10).fill(null).map(() => buildProduct())
