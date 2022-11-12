const { v4: uuidv4 } = require('uuid')
const { client } = require('../database')
const {
   schemaStudents
} = require('../validations/schemasValidators')

const idxCtrl = {}

idxCtrl.welcomePage = (req, res) => {
   return res.status(200).json({
      msg: 'Welcome to API Challenge'
   })
}

idxCtrl.saveStudents = async (req, res) => {
   try {
      const {
         apellidos, nombres, fechaNacimiento, ciudad, correo
      } = req.body

      if ( !apellidos || !nombres || !fechaNacimiento || !ciudad || !correo ) {
         return res.status(400).json({
            msg: 'Todos los campos son requeridos'
         })
      }

      const apellidosN = apellidos.trim(),
         nombresN = nombres.trim(),
         fechaNacimientoN = fechaNacimiento.trim(),
         ciudadN = ciudad.trim(),
         correoN = correo.trim()

      const msg = schemaStudents(apellidosN, nombresN, fechaNacimientoN, ciudadN, correoN)
      if (msg) return res.status(400).json({ msg })

      const student = {
         id: uuidv4(),
         apellidos: apellidosN,
         nombres: nombresN,
         fechaNacimiento: fechaNacimientoN,
         ciudad: ciudadN,
         correo: correoN
      }

      const resp = await client.query('INSERT INTO students SET ?', student)

      if (resp.affectedRows > 0) {
         return res.status(200).json({
            msg: 'Usuario registrado con éxito'
         })
      } else {
         return res.status(400).json({
            msg: 'No se ha podido registrar al usuario'
         })
      }
   } catch (e) {
      console.error(e)

      return res.status(500).json({
         msg: 'Error del server. Intentelo más luego x_x.'
      })
   }


}

idxCtrl.saveSchedule = async (req, res) => {
   try {
      const {
         idStd, courses
      } = req.body
      let schedule = []

      if ( !idStd || !courses || !courses?.length ) {
         return res.status(400).json({
            msg: 'Todos los campos son requeridos'
         })
      }

      const searchStd = await client.query('SELECT idStd FROM schedule WHERE idStd = ?', idStd)

      if (searchStd.length > 0) {
         return res.status(400).json({
            msg: 'El estudiante ya tiene su horario asignado'
         })
      }

      courses.forEach(item => {
         schedule.push([
            idStd,
            item.desiredCourse,
            item.requiredCourse
         ])
      })

      const resp = await client.query('INSERT INTO schedule (idStd, desiredCourse, requiredCourse) VALUES ?', [schedule])

      if (resp.affectedRows > 0) {
         return res.status(200).json({
            msg: 'Horario registrado con éxito'
         })
      } else {
         return res.status(400).json({
            msg: 'No se ha podido registrar el horario'
         })
      }
   } catch (e) {
      console.error(e)

      return res.status(500).json({
         msg: 'Error del server. Intentelo más luego x_x.'
      })
   }
}

idxCtrl.searchSchedule = async (req, res) => {
   try {
      const {
         idStd
      } = req.params

      if ( !idStd ) {
         return res.status(400).json({
            msg: 'Todos los campos son requeridos'
         })
      }

      const searchStd = await client.query('SELECT id, idStd, desiredCourse, requiredCourse FROM schedule WHERE idStd = ?', idStd)

      if (searchStd.length === 0) {
         return res.status(400).json({
            msg: 'El estudiante no tiene horario asignado'
         })
      }

      let table = []

      searchStd.forEach((item) => {
         const { desiredCourse, requiredCourse } = item

         if (table.includes(requiredCourse)) {
            if (table.includes(desiredCourse)) {
               table.splice(table.indexOf(desiredCourse), 1)
               table.splice(table.indexOf(requiredCourse) + 1, 0, desiredCourse)
            } else {
               table.splice(table.indexOf(requiredCourse) + 1, 0, desiredCourse)
            }
         } else {
            if (table.includes(desiredCourse)) {
               table.unshift(requiredCourse)
               table.splice(table.indexOf(desiredCourse), 1)
               table.splice(table.indexOf(requiredCourse) + 1, 0, desiredCourse)
            } else {
               table.unshift(requiredCourse)
               table.splice(table.indexOf(requiredCourse), 0, desiredCourse)
            }
         }
      })

      return res.status(200).json({
         msg: 'El estudiante tiene el horario asignado',
         data: table.map((item, idx) => { return {id: idx, asig: item} })
      })


   } catch (e) {
      console.error(e)

      return res.status(500).json({
         msg: 'Error del server. Intentelo más luego x_x.'
      })
   }
}

module.exports = idxCtrl