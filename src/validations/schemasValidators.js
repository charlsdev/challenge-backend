const {
   validate_letrasSpace,
   validate_email,
   validate_fecha
} = require('./regex')

const schemaStudents = (
   apellidos, nombres, fechaNacimiento, ciudad, correo
) =>  {
   if (apellidos === '' || nombres === '' || fechaNacimiento === '' || ciudad === '' || correo === '')
      return 'Campos vacíos o con espacios'
   if (!validate_letrasSpace(apellidos)) return 'Apellidos no válidos'
   if (!validate_letrasSpace(nombres)) return 'Nombres no válidos'
   if (!validate_letrasSpace(ciudad)) return 'Ciudad no válida'
   if (!validate_email(correo)) return 'Email no válido'
   if (!validate_fecha(fechaNacimiento)) return 'Fecha de nacimiento no válida'
}

module.exports = {
   schemaStudents
}