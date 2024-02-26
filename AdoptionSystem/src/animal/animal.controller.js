'use strict'

import Animal from './animal.model.js'
import User from "../user/user.model.js"


export const testAnimal = (req, res) => {
    console.log('animal test is running')
    return res.send({ message: 'animal test is running' })
}

export const registerAnimal = async (req, res) => {
    try {
        //capturar el body
        let data = req.body
        console.log(data)
        //asignar un rol por defecto
        //validar que el keeper exista
        let user = await User.findOne({ _id: data.keeper })
        if (!user) return res.status(404).send({ message: 'Keeper not found' })
        //guardar la info en la db
        let animal = new Animal(data)
        await animal.save()
        //respuesta
        return res.send({ message: `registered successfully, ${animal.name} is part of the family now` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering animal', err: err })
    }
}

export const getAnimal = async (req, res) => {
    try {
        let animals = await Animal.find()
        return res.send({ animals })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'error getting animals' })
    }
}

export const searchAnimal = async (req, res) => {
    try {
        //Obtener el parametro de busqueda
        let { search } = req.body
        // buscar
        let animals = await Animal.find(
            {name: search}
        )//.populate('keeper', ['name', 'phone'])
        //validar la respuesta
        if(!animals) return res.status(404).send({message: 'Animals found', animals})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error finding animal' })
    }
}

export const updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body

        //Actualizar
        let updatedAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        //validar
        if (!updatedAnimal) return res.status(400).send({ message: `animal not found an not updated` })
        //Eliminar informacion sensible
        //respuesta al usuario
        return res.send({ message: 'Animal updated', updateAnimal })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        //obtener id
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({ _id: id })
        //verificacion
        if (!deletedAnimal) return res.status(404).send({ message: 'Animal not found and not deleted' })
        return res.send({ message: `Animal whit name ${deletedAnimal.name} deleted successfully` })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `error deleting Animal` })
    }
}