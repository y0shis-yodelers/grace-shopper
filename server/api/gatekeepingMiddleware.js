const isAdmin = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next()
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    res.sendStatus(403)
  }
}

const isAdminOrUser = (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id.toString() === req.params.userId) {
      next()
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    res.sendStatus(403)
  }
}

module.exports = {
  isAdmin,
  isAdminOrUser
}
