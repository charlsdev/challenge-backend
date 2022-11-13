const { admin } = require('../firebase/serviceCredentials')

const getAuthToken = (req, res, next) => {
   if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
   ) {
      req.authToken = req.headers.authorization.split(' ')[1]
   } else {
      req.authToken = null
   }

   next()
}

const checkIfAuthenticated = (req, res, next) => {
   getAuthToken(req, res, async () => {
      try {
         const { authToken } = req

         const respAuth = await admin.auth().verifyIdToken(authToken)

         if (respAuth) return next()

         return res.status(401).send({ error: 'No posees autorización x_x' })
      } catch (e) {
         console.log(e)

         return res.status(500).send({ error: 'No posees autorización. Error x_x' })
      }
   })
}

module.exports = checkIfAuthenticated