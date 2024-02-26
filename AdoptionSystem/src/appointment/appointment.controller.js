'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appontiment.model.js'

export const test = async (req, res) => {
    return res.send({ message: 'Function test is running | appointment' })
}

export const save = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //let [uid] = req.user
        data.use = req.user.uid // llama al usuario logeado
        //Verificar que exista el animal
        let animal = Animal.findOne({ _id: data.animal })
        if (!animal) return res.status(404).send({ message: 'Animal not found' })
        //Validar que la mascota no tenga una cita activa con esa persona
        let existAppointment = await Appointment.findOne({
            $and: [
                { animal: data.animal },
                { user: data.user }
            ]

        })
        if (existAppointment) return res.send({ message: 'Appointment already exist' })
        //EJERCICIO: Que el usuario solo pueda tener una cita por dia\\
        let moreAppointment = await Appointment.findOne({
            $or: [
                {
                    date: data.date,
                    user: data.user
                },
                {
                    date: data.date,
                    animal: data.animal
                }
            ]
        })
        if (moreAppointment) return res.send({ message: 'You have appointment for this day' })
        //GUARDAR
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({ message: `Appointment saved succesfully for the date ${appointment.date}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creatin apointment', err })
    }
}