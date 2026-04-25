const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    booking_id:Number,
    booking_date:Date,
    machinery_id:Number,
    start_date:Date,
    end_date:Date,
    no_of_days:Number,
    rent_per_day: Number,
    farmer_id: Number,
    amount: Number
})

module.exports = mongoose.model("booking_detail",bookingSchema);