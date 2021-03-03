const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const isAdminOrUser = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.userId) {
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  isAdmin,
  isAdminOrUser
}
