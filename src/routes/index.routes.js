const { Router } = require('express')
const router = Router()

const {
   welcomePage,
   saveStudents,
   saveSchedule,
   searchSchedule,
   signupUser
} = require('../controllers/index.controllers')

// const checkIfAuthenticated = require('../middleware/tokenFirebase')

// Ruta inicial
router.get('/', welcomePage)

// Ruta para loguearse
router.post('/signup', signupUser)

// Ruta para guardar un estudiante
router.post('/student', /*checkIfAuthenticated,*/ saveStudents)

// Ruta para registrar el horario de un estudiante
router.post('/schedule', /*checkIfAuthenticated,*/ saveSchedule)

//Ruta para listar en orden el horario asignado al estudiante
router.get('/searchSchedule/:idStd', /*checkIfAuthenticated,*/ searchSchedule)

module.exports = router