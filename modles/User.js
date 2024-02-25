let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        max: 10,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 15
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        require: true,
        unique: true
    },
    city: {
        type: String,
        max: 30
    },
    state: {
        type: String,
        max: 20
    },
    country: {
        type: String,
        max: 10
    },
    postalCode: {
        type: String,
        max: 50
    },

},
    { timestamps: true }
)

module.exports = mongoose.model('Users',userSchema)
