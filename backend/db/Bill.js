const mongoose = require("mongoose");
const billSchema = new mongoose.Schema({
    bill_id:Number,
    bill_date:Date,
    booking_id:Number,
    farmer_id:Number,
    amount: Number
    
})

module.exports = mongoose.model("bill_detail",billSchema);