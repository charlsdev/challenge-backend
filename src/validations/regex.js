const validate_email = (correo) => {
   var emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
   if (emailRegex.test(correo)) {
      return true
   }
   return false
}

const validate_numbers = (numbers) => {
   var numbersRegex =
      /^[0-9]+$/
   if (numbersRegex.test(numbers)) {
      return true
   }
   return false
}

function validate_fecha(fecha) {
   var fechaRegex =
      /^\d{4}-\d{1,2}-\d{1,2}$/
   if (fechaRegex.test(fecha)) {
      return true
   }
   return false
}

const validate_letras = (letras) => {
   var letrasRegex =
      /^[A-Z]+$/i
   if (letrasRegex.test(letras)) {
      return true
   }
   return false
}

const validate_letrasSpace = (letras) => {
   var letrasRegex =
      /^[A-Zá-ü ]+$/i
   if (letrasRegex.test(letras)) {
      return true
   }
   return false
}

module.exports = {
   validate_email,
   validate_numbers,
   validate_fecha,
   validate_letras,
   validate_letrasSpace
}