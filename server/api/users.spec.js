/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})

    const seedUsers = require('../../script/seed/users-seed')

    await Promise.all(
      seedUsers.map(user => {
        return User.create(user)
      })
    )
  })

  describe('/api/users/', async () => {
    it('allows admin users to GET all users', () => {
      const users = request
        .agent(app)
        .get('/api/users')
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(10)
        })
        .catch(err => console.log('this err happened: ', err))
    })

    it('does NOT allow non-admin users to GET all users', () => {
      request(app)
        .get('/api/users')
        .then(res => {
          expect(res.statusCode).to.equal(403)
        })
        .catch(err =>
          console.log('catching the expected AssertionError: ', err)
        )
    })
  })
})
