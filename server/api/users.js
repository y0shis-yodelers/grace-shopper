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
    const user = await User.findByPk(req.params.userId, {
      include: Address,
    })
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

    const updateUserInfo = {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    }

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
