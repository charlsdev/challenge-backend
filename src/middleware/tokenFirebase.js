const { admin } = require('../firebase/serviceCredentials')

const checkAuth = async (req, res, next) => {
   try {
      if (
         req.headers.authorization &&
         req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
         const authToken = req.headers.authorization.split(' ')[1]
         const respAuth = await admin.auth().verifyIdToken(authToken)

         if (respAuth) return next()

         return res.status(401).send({ error: 'No posees autorización x_x' })
      } else {
         return res.status(500).send({ error: 'No posees autorización. Warning x_x' })
      }
   } catch (e) {
      console.log(e)

      return res.status(500).send({ error: 'No posees autorización. Error x_x' })
   }

}

module.exports = checkAuth