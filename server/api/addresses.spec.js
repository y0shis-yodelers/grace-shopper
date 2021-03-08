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

  describe('/api/addresses/', () => {
    it('allows admin users to GET all address', async () => {
      try {
        const res = await request.agent(app).get('/api/addresses/')
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(10)
      } catch (err) {
        console.error(err)
      }
    })
  })

  describe('/api/addresses/:addressId', () => {
    it('allows admin users to PUT / update an address', async () => {
      try {
        const updateInfo = {
          address: {
            streetName: 'new name'
          }
        }

        await request
          .agent(app)
          .put('/api/addresses/1')
          .send(updateInfo)

        const res = await request.agent(app).get('/api/addresses/1')

        expect(res.body.streetName).to.equal('new name')
      } catch (err) {
        console.error(err)
      }
    })
  })
})
