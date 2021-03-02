const router = require('express').Router()
const {User, Address} = require('../db/models')
module.exports = router

// GET single user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST single user
router.post('/:userId', async (req, res, next) => {
  try {
    const [user, userWasCreated] = await User.findOrCreate({
      where: {
        id: +req.params.userId,
      },
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// UPDATE single user
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId, {include: Address})
    const updateUserInfo = {
      name: req.body.name,
      // how to handle the address
      // as a separate table in this REST route?
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    }
    const updatedUser = await user.update(updateUserInfo, {
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
