const mongoose = require('mongoose');


const feeSchema = mongoose.Schema({
    timing: {type: String, required:true},    
    fees: {type: String, required: true},
    availability: {type: Boolean, required: true}
})

const FeeModel = mongoose.model('fee-structure', feeSchema);

module.exports = {
    FeeModel
}
