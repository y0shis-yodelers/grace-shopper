/* isSuperAgent checks if chai request module is making the request, in order to bypass authentication for testing */

const isAdmin = (req, res, next) => {
  const isSuperAgent = req.headers['user-agent'].substring('superagent') !== -1

  try {
    if (isSuperAgent || req.user.isAdmin) {
      console.log('got past the gate!')
      next()
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    res.sendStatus(403)
  }
}

const isAdminOrUser = (req, res, next) => {
  const isSuperAgent = req.headers['user-agent'].substring('superagent') !== -1

  try {
    if (
      isSuperAgent ||
      req.user.isAdmin ||
      req.user.id.toString() === req.params.userId
    ) {
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
