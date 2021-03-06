const router = require('express').Router()
const {Address} = require('../db/models')
const {isAdmin, isAdminOrUser} = require('./gatekeepingMiddleware')
module.exports = router

// GET /api/addresses
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const addresses = await Address.findAll()
    res.json(addresses)
  } catch (err) {
    next(err)
  }
})

// GET /api/addresses/:addressId
router.get('/:addressId', isAdminOrUser, async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.addressId)
    res.json(address)
  } catch (err) {
    next(err)
  }
})

// UPDATE address
router.put('/:addressId', isAdminOrUser, async (req, res, next) => {
  try {
    // req.body.address:
    // address: {
    //   number, houseOrApt, streetName, city, state, zip
    // }
    // from local state of user form

    const address = await Address.findByPk(req.params.addressId)

    const updateInfo = req.body.address

    const updatedAddress = await address.update(updateInfo, {returning: true})

    res.status(204).json(updatedAddress)
  } catch (err) {
    next(err)
  }
})
