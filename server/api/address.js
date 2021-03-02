const router = require('express').Router()
const {Address} = require('../db/models')
module.exports = router

// UPDATE address
router.put('/:addressId', async (req, res, next) => {
  try {
    const address = await Address.findByPk(req.params.addressId)

    // req.body.address:
    // address: {
    //   number, houseOrApt, streetName, city, state, zip
    // }
    // from local state of user form

    const updateAddressInfo = req.body.address

    await Address.update(updateAddressInfo)
  } catch (err) {
    console.error(err)
  }
})
