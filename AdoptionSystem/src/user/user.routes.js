import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import { test, register, login, update, deleteU } from './user.controller.js';

const api = express.Router();

//rutas publicas
api.post('/register', register)
api.post('/login', login)
//rutas privadas (solo usuarios logeados)
api.get('/test', [validateJwt, isAdmin], test)
api.put('/update/:id', [validateJwt], update) //MiddLeware -> funciones intermedias que sirven para validar
api.delete('/delete/:id', [validateJwt], deleteU)


export default api