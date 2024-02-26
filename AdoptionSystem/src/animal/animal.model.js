import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    specie: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: false
    },
    birthdate: {
        type: String,
        required: false
    },
    keeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:false
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADOPTED', 'AVAILABLE'],
        required: true
    }
}, {
    versionKey: false //desabilita el _v de mongo
}
)

export default mongoose.model('animal', animalSchema)