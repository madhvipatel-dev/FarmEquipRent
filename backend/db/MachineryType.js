const mongoose = require("mongoose");
const mtSchema = new mongoose.Schema({
    type_id:Number,
    type_name:String
})

module.exports = mongoose.model("type_master",mtSchema);