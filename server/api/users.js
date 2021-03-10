const router = require('express').Router()
const {User, Address, Order, Product} = require('../db/models')
const {isAdmin, isAdminOrUser} = require('./gatekeepingMiddleware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'phoneNumber', 'userType', 'isAdmin'],
      include: [{model: Address}, {model: Order, include: {model: Product}}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET single user
//ADD BACK login
router.get('/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{model: Address}, {model: Order, include: {model: Product}}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// POST single user
router.post('/', async (req, res, next) => {
  try {
    const user = await User.Create(req.body)
    const newOrder = await Order.create({
      isPaid: false,
      userId: user.id
    })
    user.hasOrder(newOrder)
    console.log('red', 'blue')
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// UPDATE single user
router.put('/:userId', isAdminOrUser, async (req, res, next) => {
  try {
    const {id, name, email, phoneNumber, password} = req.body
    const {userId} = req.params

    //if (id !== userId) res.status(304).end()

    const salt = User.generateSalt()
    const hashedPw = User.encryptPassword(password, salt)

    await User.update(
      {name, email, phoneNumber, salt, password: hashedPw},
      {where: {id: userId}}
    )

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// DELETE single user
router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
