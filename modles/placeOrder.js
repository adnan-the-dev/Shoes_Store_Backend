const mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    subTotal: {
        type: Number,
    },
    status:{
        type:String,
        enum : ["pending","complete"],
        default: 'pending'
    },
    items: [
        {
            itemId: mongoose.Schema.Types.ObjectId,
            quantity: String,
            size: String,
            itemPrice:String,
            itemImage:String,
            itemName:String
        }
    ]

},
    { timestamps: true }
)

module.exports = mongoose.model('Orders',orderSchema)