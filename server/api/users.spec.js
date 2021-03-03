/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    const Bob = {
      name: 'Bob',
      email: 'bob@bob.com',
      address: '101 bob way chicago il 60660',
      phoneNumber: '15551234567',
      userType: 'registered',
      isAdmin: false
    }

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })

    it('POST /api/users/:userId', async () => {
      const res = await request(app).post('/api/users', Bob)
    })
  })

  describe('api/users/:userId', () => {
    const Alice = {
      name: 'Alice',
      email: 'alice@alice.com',
      address: '101 alice way chicago il 60660',
      phoneNumber: '15551234567',
      userType: 'registered',
      isAdmin: false
    }

    beforeEach(() => {
      return User.create(Alice)
    })

    it('GET singleUser, /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body).to.deep.equal(Alice)
    })
  })

  describe('POST api/users/:userId', () => {
    const Alice = {
      name: 'Alice',
      email: 'alice@alice.com',
      address: '101 alice way chicago il 60660',
      phoneNumber: '15551234567',
      userType: 'registered',
      isAdmin: false
    }

    it('POST /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body).to.deep.equal(Alice)
    })
  })
}) // end describe('User routes')
