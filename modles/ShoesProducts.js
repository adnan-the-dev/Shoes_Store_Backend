const mongoose = require('mongoose')

let productsSchema = mongoose.Schema({
    productname: {
        type: String,
        require: true
    },
    mindetail: {
        type: String,
        require: true
    },
    fulldetail: {
        type: String,
        require: true
    },
    catagory: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    qunty: {
        type: String,
        require: true
    },
    pay: {
        type: String,
        require: true
    },
      sizes:  {
        type:Array,
        default:[]
    }
    ,
    images:{
        type:Array,
        default:[]
    }

},
    { timestamps: true }
)

module.exports = mongoose.model("AddiasProduct", productsSchema)
