const mongoose = require("mongoose");
const farmerSchema = new mongoose.Schema({
    farmer_id:Number,
    farmer_name:String,
    address:String,
    city:String,
    mobile_no:String,
    email_id:String,
    pwd:String,
    gender:String
})

module.exports = mongoose.model("farmer_detail",farmerSchema);