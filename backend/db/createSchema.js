const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        
    },
    contact: {
        type: Number,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }

   

})
module.exports = mongoose.model("category", catSchema)