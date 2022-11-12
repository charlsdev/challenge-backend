const { Router } = require('express')
const router = Router()

const {
   welcomePage,
   saveStudents,
   saveSchedule,
   searchSchedule
} = require('../controllers/index.controllers')

router.get('/', welcomePage)

router.post('/student', saveStudents)

router.post('/schedule', saveSchedule)

router.get('/searchSchedule/:idStd', searchSchedule)

module.exports = router