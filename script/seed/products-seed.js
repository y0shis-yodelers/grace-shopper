const names = [
  'fender all-star',
  'the enforcer',
  'pygmalion',
  'alice',
  'earl skuggs special',
  'serenity',
  'the red power ranger',
  'seagull fodder',
  'pickenator',
  'pickle, the only pick made from real pickles'
]

const description =
  'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'

const imageUrls = [
  'https://imgur.com/zNwEcoz.jpg',
  'https://imgur.com/HSoWZKP.jpg',
  'https://imgur.com/pwKXURH.jpg',
  'https://imgur.com/jEMFIfp.jpg',
  'https://imgur.com/qHp9pGM.jpg',
  'https://imgur.com/QCjzxJb.jpg',
  'https://imgur.com/zFep5xB.jpg',
  'https://imgur.com/lLRA4PS.jpg',
  'https://imgur.com/uvsWwbS.jpg',
  'https://imgur.com/2Lmtth8.jpg',
  'https://imgur.com/VvWxbEH.jpg',
  'https://imgur.com/IPqMPS2.jpg',
  'https://imgur.com/R0es16f.jpg',
  'https://imgur.com/hY38Xkk.jpg',
  'https://imgur.com/dD98UxJ.jpg',
  'https://imgur.com/2rjFQzW.jpg',
  'https://imgur.com/ifuj4LO.jpg',
  'https://imgur.com/rmy82ct.jpg',
  'https://imgur.com/RSJYKkU.jpg',
  'https://imgur.com/8OB7xc6.jpg',
  'https://imgur.com/DqsCTxx.jpg',
  'https://imgur.com/UamfqbX.jpg',
  'https://imgur.com/8MbJwJU.jpg',
  'https://imgur.com/Hz6W5TI.jpg',
  'https://imgur.com/ogPy94b.jpg',
  'https://imgur.com/WrnhHw3.jpg',
  'https://imgur.com/4u7nyrd.jpg',
  'https://imgur.com/71YaL6x.jpg',
  'https://imgur.com/BcXqhYJ.jpg',
  'https://imgur.com/I6frIiS.jpg',
  'https://imgur.com/BcRJTDC.jpg',
  'https://imgur.com/m28YgSX.jpg',
  'https://imgur.com/d1bKrKl.jpg',
  'https://imgur.com/mHFByae.jpg',
  'https://imgur.com/7fHpxVA.jpg',
  'https://imgur.com/AZykHw6.jpg',
  'https://imgur.com/Ug08pRg.jpg',
  'https://imgur.com/4FVpRUQ.jpg',
  'https://imgur.com/XwuJork.jpg',
  'https://imgur.com/55P2jyC.jpg',
  'https://imgur.com/bkMqn0q.jpg',
  'https://imgur.com/uvlygQI.jpg',
  'https://imgur.com/BBpnehF.jpg',
  'https://imgur.com/YkxLjEt.jpg',
  'https://imgur.com/bo8GTui.jpg',
  'https://imgur.com/8p4vQ1q.jpg',
  'https://imgur.com/K4aociq.jpg',
  'https://imgur.com/4LBFL2R.jpg',
  'https://imgur.com/axFyjB8.jpg',
  'https://imgur.com/6gZcrtY.jpg',
  'https://imgur.com/Myz1MSW.jpg',
  'https://imgur.com/kywOQ1s.jpg',
  'https://imgur.com/bSldLGC.jpg',
  'https://imgur.com/qcN9X8V.jpg',
  'https://imgur.com/vMp567e.jpg',
  'https://imgur.com/fC2xO8G.jpg'
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
