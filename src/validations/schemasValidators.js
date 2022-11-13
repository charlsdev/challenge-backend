const {
   validate_letrasSpace,
   validate_email,
   validate_fecha
} = require('./regex')

/**
 * @description Función para validar que el correo y el password sean válidos y sin espacios en blancos
 * @param {string} email
 * @param {string} password
 * @returns string
 */
const schemaSignup = (
   email, password
) =>  {
   if (email === '' || password === '')
      return 'Campos vacíos o con espacios'
   if (!validate_email(email)) return 'Email no válido'
}

/**
 * @description Función para validar que cada uno de los parámetros sean válidos y sin espacios en blancos
 * @param {string} apellidos
 * @param {string} nombres
 * @param {date} fechaNacimiento
 * @param {string} ciudad
 * @param {string} correo
 * @returns string
 */
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
   schemaSignup,
   schemaStudents
}