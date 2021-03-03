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
    // adminUser can hit all endpoints
    const adminUser = {
      id: 1,
      createdAt: '2021-03-03 16:34:06.742-06',
      isAdmin: true,
      updatedAt: '2021-03-03 16:34:06.742-06',
      userType: null,
      payOption: 'credit-card',
      password:
        '08759d8c8a0d2dbd2f18e6ab9ec9de9054a1191c588c9e11db42bf6b63777c59',
      salt: 'SPeoOj79JwIDIDX887IR+A==',
      googleId: null,
      email: 'htulloch0@cloudflare.com',
      name: 'Ham Tulloch',
      phoneNumber: '4018752916'
    }

    const notAdminUser = {
      id: 2,
      createdAt: '2021-03-03 16:34:06.742-06',
      isAdmin: false,
      updatedAt: '2021-03-03 16:34:06.742-06',
      userType: null,
      payOption: 'credit-card',
      password:
        'dd750f2ebc5577a27f6fed217d081ca94ab63ce5421007fe26e8abe35b0b2ce1',
      salt: 'fD5LKgJfCsVjxHX4ynfshA==',
      googleId: null,
      email: 'drenfield1@wikia.com',
      name: 'Delores Renfield',
      phoneNumber: '9878788081'
    }

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      console.log(res)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(adminUser.email)
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

    const Bob = {
      name: 'Bob',
      email: 'bob@bob.com',
      address: '101 bob way chicago il 60660',
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
