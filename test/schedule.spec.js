require('dotenv').config()

const { client } = require('../src/database')
const app = require('../src/server')
const request = require('supertest')
const { schedule, orderSchedule } = require('../src/helpers/scheduleSchemaTest')

describe('Router /schedule', () => {
   test('Should response with a message error from required fields', async () => {
      const resp = await request(app)
         .post('/schedule')
         .send({})
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(400)
      expect(resp.type).toBe('application/json')
   })

   test('Should response with a message error from empty fields', async () => {
      const resp = await request(app)
         .post('/schedule')
         .send({
            'idStd': '324234qwserwer',
            'courses': ''
         })
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(400)
      expect(resp.body).toBeInstanceOf(Object)
      expect(resp.body).toMatchObject({
         msg: 'Todos los campos son requeridos'
      })
   })

   test('Should response with a code 400 because incorrect id of the student', async () => {
      const resp = await request(app)
         .post('/schedule')
         .send({
            'idStd': ' df ',
            'courses': ['', 'sdfs']
         })
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(400)
      expect(resp.body).toBeInstanceOf(Object)
      expect(resp.body).toMatchObject({
         msg: 'ID incorrecto del estudiante'
      })
   })

   test('Should response with a code 200 because save schedule successfully', async () => {
      const resp = await request(app)
         .post('/schedule')
         .send({
            'idStd': '2c006a69-adfa-4762-ace7-d6d54aaa74d0',
            'courses': schedule
         })
         .set('Accept', 'application/json')

      expect(resp.statusCode).toBe(200)
      expect(resp.body).toBeInstanceOf(Object)
      expect(resp.body).toMatchObject({
         msg: 'Horario registrado con éxito'
      })
   })

   test('Should response with a code 404 because not found page', async () => {
      const resp = await request(app)
         .get('/schedule')

      expect(resp.statusCode).toBe(404)
   })

   test('Should response with a code 200 because is correct order of the schedule', async () => {
      const resp = await request(app).get('/searchSchedule/2c006a69-adfa-4762-ace7-d6d54aaa74d0')

      expect(resp.statusCode).toBe(200)
      expect(resp.body).toBeInstanceOf(Object)
      expect(resp.body).toMatchObject({
         data: orderSchedule
      })
   })

   afterAll(async () => {
      await client.end()
   })
})