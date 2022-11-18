const { Router } = require('express')
const router = Router()

const {
   welcomePage,
   saveStudents,
   saveSchedule,
   searchSchedule,
   signupUser
} = require('../controllers/index.controllers')

// const checkAuth = require('../middleware/tokenFirebase')

// Ruta inicial
router.get('/', welcomePage)

// Ruta para registrarse y obtener el token
router.post('/signup', signupUser)

// Ruta para guardar un estudiante
router.post('/student', /*checkAuth,*/ saveStudents)

// Ruta para registrar el horario de un estudiante
router.post('/schedule', /*checkAuth,*/ saveSchedule)

//Ruta para listar en orden el horario asignado al estudiante
router.get('/searchSchedule/:idStd', /*checkAuth,*/ searchSchedule)

module.exports = router