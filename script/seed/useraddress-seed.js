// one helper that generates ids
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const getId = () => {
  return ids[Math.floor(Math.random() * ids.length)]
}

const buildUserAddress = () => {
  return {
    userId: getId(),
    addressId: getId()
  }
}

module.exports = new Array(5).fill(null).map(() => buildUserAddress())
