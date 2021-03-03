const router = require('express').Router()
const {Address} = require('../db/models')
const {isAdminOrUser} = require('./gatekeepingMiddleware')
module.exports = router

// UPDATE address
router.put('/:addressId', isAdminOrUser, async (req, res, next) => {
  try {
    // req.body.address:
    // address: {
    //   number, houseOrApt, streetName, city, state, zip
    // }
    // from local state of user form

    const updateAddressInfo = req.body.address

    const update = await Address.update(updateAddressInfo, {
      where: {id: addressId}
    })
  } catch (err) {
    console.error(err)
  }
})
