'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body
        console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({ message: `Registered successfully, can be logged with username ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        //capturar datos(body)
        let { username, password } = req.body
        //Validar si el user existe
        let user = await User.findOne({ username })
        //Verifico que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            //generar el token
            let token = await generateJwt(loggedUser)
            //respoder al usuario
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser, token })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}

export const update = async (req, res) => {
    try {
        //Obeten el id del usuario a actualizar
        let { id } = req.params
        //obtener los datos a actualizar
        let data = req.body
        //validar si trae datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'have submitted some data that cannot be updated' })
        //validar sus permisos
        //Actualizar
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },//objecsID <- hexadecimales(hora del sistema, version de mongo, llave privada)
            data, //los datos que se can a actualizar
            { new: true }
        )
        //Validar la actu
        if (!updatedUser) return res.status(401).send({ message: `user not found an not updated` })
        //respuesta al usuario
        return res.send({ message: 'User updated', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //Obtener el id
        let { id } = req.params
        //validar si esta logrado y es el mismo x no lo vemos hoy x
        //Eliminar (deleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //Verficar que se elimino
        if (!deletedUser) return res.status(404).send({ message: 'Acount not found and not deleted' })
        //responder
        return res.send({ message: `Account whit username ${deletedUser.username} deleted successfully` })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `error deleting acount` })
    }
}