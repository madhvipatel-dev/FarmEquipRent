const mongoose = require("mongoose");
const machinerySchema = new mongoose.Schema({
    machinery_id:Number,
    machinery_name:String,
    type_id:Number,
    description:String,
    rent_per_day:Number,
    machinery_img:String
})

module.exports = mongoose.model("machinery_detail",machinerySchema);