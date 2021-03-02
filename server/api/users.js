const router = require('express').Router()
const {User, Address} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET single user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST single user
router.post('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// UPDATE single user
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: Address,
    })
    // where local state in user update form contains:
    // address: {
    //   number, houseOrApt, streetName, city, state, zip
    // }
    const updateAddressInfo = req.body.address
    const updateUserInfo = {
      name: req.body.name,
      // how to handle the address
      // as a separate table in this REST route?

      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    }
    // update address without returning
    await Address.update(updateAddressInfo)
    // THEN update and return user with modified address
    const updatedUser = await User.update(updateUserInfo, {
      returning: true,
    })
    res.status(204).send(updatedUser)
  } catch (err) {
    next(err)
  }
})

// DELETE single user
router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId)
    await user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
