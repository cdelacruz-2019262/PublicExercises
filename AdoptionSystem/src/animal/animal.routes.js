import express from "express";
import { deleteAnimal, getAnimal, registerAnimal, searchAnimal, testAnimal, updateAnimal } from './animal.controller.js';

const api = express.Router();

api.get('/testAnimal', testAnimal)
api.post('/registerAnimal', registerAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)
api.get('/getAnimal', getAnimal)
api.post('/searchAnimal', searchAnimal)

export default api