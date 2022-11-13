require('dotenv').config()

const { client } = require('../src/database')
const app = require('../src/server')
const request = require('supertest')

describe('Router /student', () => {
   test('Should response with a message error from required fields', async () => {
      const resp = await request(app)
         .post('/student')
         .send({})
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(400)
      expect(resp.type).toBe('application/json')
   })

   test('Should response with a message error from empty fields', async () => {
      const resp = await request(app)
         .post('/student')
         .send({
            'apellidos': '',
            'nombres': '',
            'fechaNacimiento': '',
            'ciudad': '    ',
            'correo': ''
         })
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(400)
      expect(resp.type).toBe('application/json')
   })

   test('Should response with a message error from string not value', async () => {
      const resp = await request(app)
         .post('/student')
         .send({
            'apellidos': 'Developer23',
            'nombres': 'Challenge32',
            'fechaNacimiento': '1992-12-23',
            'ciudad': '  Ecuador  ',
            'correo': 'carlos@gmail.com'
         })
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(400)
      expect(resp.type).toBe('application/json')
   })

   test('Should response with a code 200 because save student successfully', async () => {
      const resp = await request(app)
         .post('/student')
         .send({
            'apellidos': 'Developer',
            'nombres': 'Challenge',
            'fechaNacimiento': '1992-12-23',
            'ciudad': '  Ecuador  ',
            'correo': 'carlos@gmail.com'
         })
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(200)
      expect(resp.type).toBe('application/json')
   })

   afterAll(async () => {
      await client.end()
   })
})