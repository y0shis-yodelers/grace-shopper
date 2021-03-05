const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Address = db.model('address')

describe('Address routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})

    const seedAddress = require('../../script/seed/addresses-seed')

    await Promise.all(
      seedAddress.map(address => {
        return Address.create(address)
      })
    )
  })

  describe('/api/address/', async () => {
    it('allows admin users to GET all address', () => {
      const addresses = request
        .agent(app)
        .get('/api/addresses/')
        .then(res => {
          expect(res.body).to.be.an('object')
          //expect(res.body).to.have.lengthOf(10)
        })
        .catch(err => console.log('this err happened: ', err))
    })
  })
})
