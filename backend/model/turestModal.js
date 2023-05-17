const mongoose = require('mongoose')

const TourSchema = mongoose.Schema({
    place:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('Tour',TourSchema);