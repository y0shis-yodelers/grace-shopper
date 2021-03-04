/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Address = db.model('address')

describe('Address Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields number, houseOrApt, streetName, city, state, zip', async () => {
    const address = await Address.create({
      number: '103',
      houseOrApt: 'apartment',
      streetName: 'Drumcavel Road',
      city: 'gold coast',
      state: 'CO',
      zip: '82375'
    })

    expect(address.number).to.equal('103')
    expect(address.houseOrApt).to.equal('apartment')
    expect(address.streetName).to.equal('Drumcavel Road')
    expect(address.city).to.equal('gold coast')
    expect(address.state).to.equal('CO')
    expect(address.zip).to.equal('82375')
  })

  it('requires all fields', async () => {
    try {
      const newAddress = await Address.create({
        number: '103',
        houseOrApt: 'apartment',
        streetName: 'Drumcavel Road',
        city: 'gold coast',
        state: 'CO',
        zip: '82375'
      })

      let [noNum, noDom, noStreet, noCity, noState, noZip] = new Array(6)
        .fill(null)
        .map(() => {
          return {...newAddress}
        })

      delete noNum.number
      delete noDom.houseOrApt
      delete noStreet.streetName
      delete noCity.city
      delete noState.state
      delete noZip.zip

      try {
        await Address.create(noNum)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }

      try {
        await Address.create(noDom)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }

      try {
        await Address.create(noStreet)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }

      try {
        await Address.create(noCity)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }

      try {
        await Address.create(noState)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }

      try {
        await Address.create(noZip)
      } catch (err) {
        expect(err.message).to.contain('notNull Violation')
      }
    } catch (err) {
      expect(err.message).to.contain('notNull Violation')
    }
  })
})
