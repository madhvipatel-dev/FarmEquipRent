const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("./db/Config");
const Farmer = require("./db/Farmer");
const MachineryType = require("./db/MachineryType");
const Machinery = require("./db/Machinery");
const Booking = require("./db/Booking");
const Bill = require("./db/Bill");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

let filepath = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/public/machinery_img");
    },
    filename: function (req, file, cb) {
        filepath = "PI" + Date.now() + ".png";
        cb(null, filepath);
    }
})

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.send("Hello From Farm Equip Rent Server");
})

app.post("/regisfarmer", async function (req, res) {

    const result3 = await Farmer.findOne({ email_id: req.body.email });
    if (result3) {
        res.send({ result: "Email Id Already Exists" });
    } else {
        const result = await Farmer.find().sort({ farmer_id: -1 }).limit(1);

        let fid = 0
        if (result.length == 0) {
            fid = 1;
        }
        else {
            fid = parseInt(result[0].farmer_id) + 1;
        }
        let result2 = new Farmer({ farmer_id: parseInt(fid), farmer_name: req.body.name, address: req.body.add, city: req.body.city, mobile_no: parseInt(req.body.mno), email_id: req.body.email, pwd: req.body.pwd, gender: req.body.gender });
        let res2 = await result2.save();
        //console.log(res2);
        res.send(res2);
    }
})

app.post("/loginfarmer", async function (req, res) {
    let result = await mongoose.connection.collection('admin_login').findOne({ email_id: req.body.email, pwd: req.body.pwd });
    if (result) {
        res.send({ result: "Admin Login Succesfully" });
    }
    else {
        let result2 = await Farmer.findOne({ email_id: req.body.email, pwd: req.body.pwd });
        if (result2) {
            res.send(result2);
        }
        else {
            res.send({ result: "Check Your Email Id Or Password" })
        }
    }
})


app.post("/savetype", async function (req, res) {
    const result = await MachineryType.find().sort({ type_id: -1 }).limit(1);

    let tid = 0
    if (result.length == 0) {
        tid = 1;
    }
    else {
        tid = parseInt(result[0].type_id) + 1;
    }
    let result2 = new MachineryType({ type_id: parseInt(tid), type_name: req.body.name });
    let res2 = await result2.save();

    res.send(res2);

})

app.get("/gettypedetail",async function(req,res){
    let result = await MachineryType.find();
    res.send(result);
})

app.delete("/deletetype/:tid",async function(req,res){
    let result = await MachineryType.deleteOne({type_id: parseInt(req.params.tid)});
    res.send(result);
})

app.get("/getsingletypedetail/:tid",async function(req,res){
    let result = await MachineryType.findOne({type_id: parseInt(req.params.tid)});
    res.send(result);
})


app.put("/updatetype/:tid",async function(req,res){
    let result = await MachineryType.updateOne({type_id: parseInt(req.params.tid)},{$set: {type_name: req.body.name}});
    res.send(result);
})



app.post("/savemachinery", upload.single('image1'), async function (req, res) {
    const result = await Machinery.find().sort({ machinery_id: -1 }).limit(1);

    let mid = 0
    if (result.length == 0) {
        mid = 1;
    }
    else {
        mid = parseInt(result[0].machinery_id) + 1;
    }

    let result2 = new Machinery({ machinery_id: parseInt(mid), machinery_name: req.body.name, type_id: parseInt(req.body.typeid), description: req.body.description, rent_per_day: parseInt(req.body.rday), machinery_img: filepath });
    let res2 = await result2.save();
    //console.log(res2);
    res.send(res2);
})

app.get("/getmachinerydetail", async function (req, res) {

    let result2 = await Machinery.find();
    res.send(result2);

})

app.delete("/deletemachinery/:mid",async function(req,res){
    let result = await Machinery.deleteOne({machinery_id: parseInt(req.params.mid)});
    res.send(result);
})


app.get("/getsinglemachinerydetail/:mid", async function (req, res) {
    let result2 = await Machinery.findOne({ machinery_id: parseInt(req.params.mid) });
    res.send(result2);
})

app.put("/updatemachinery/:mid", upload.single('image1'), async function (req, res) {
 
    let result2 =await Machinery.updateOne({ machinery_id: parseInt(req.params.mid)},{$set:{ machinery_name: req.body.name, type_id: parseInt(req.body.typeid), description: req.body.description, rent_per_day: parseInt(req.body.rday), machinery_img: filepath }});
    //console.log(res2);
    res.send(result2);
})


app.get("/getmachinerytypewise/:tid", async function (req, res) {
    //console.log(req.params.cid);
    if(req.params.tid=="0")
    {
        let result2 = await Machinery.find();
        res.send(result2);
    }else{
        let result2 = await Machinery.find({ type_id: parseInt(req.params.tid) });
        res.send(result2);
    }
})


app.post("/farmer_check_avaibility", async function (req, res) {
//    let result2 = await JobDetail.aggregate([{ $match: { $and: [{ apply_end_date: { $gte: new Date(udate) } }] } },{$lookup:{ from: "company_details",localField: "company_id",foreignField: "company_id",as: "company"}}]);
    let result2 = await Booking.find({$and: [{machinery_id: parseInt(req.body.mid)},{start_date:{$lte: new Date(req.body.sdate).toISOString()}},{end_date:{$lte: new Date(req.body.edate).toISOString()}}]});
    console.log(result2);
    if(result2.length==0)
    {
        res.send(result2);
      
    }else{
       
        res.send({result: "Machine is Booked For This Date"});
    }
})


app.post("/farmer_book_machinery", async function (req, res) {
    const result = await Booking.find().sort({ booking_id: -1 }).limit(1);

    let bid = 0
    if (result.length == 0) {
        bid = 1;
    }
    else {
        bid = parseInt(result[0].booking_id) + 1;
    }
    var dt = new Date();
    var bdate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let result2 = new Booking({ booking_id: parseInt(bid), booking_date: new Date(bdate).toISOString(), machinery_id: parseInt(req.body.mid), start_date: new Date(req.body.sdate).toISOString(), end_date: new Date(req.body.edate).toISOString(), no_of_days: parseInt(req.body.ndays),rent_per_day:parseInt(req.body.rday),farmer_id: parseInt(req.body.farmerid),amount: parseInt(req.body.amt) });
    let res2 = await result2.save();
    const result3 = await Bill.find().sort({bill_id: -1 }).limit(1);

    let billid = 0
    if (result3.length == 0) {
        billid = 1;
    }
    else {
        billid = parseInt(result3[0].bill_id) + 1;
    }
    let result4 = new Bill({ bill_id: parseInt(billid),bill_date: new Date(bdate).toISOString(), booking_id: parseInt(bid), farmer_id: parseInt(req.body.farmerid), amount: parseInt(req.body.amt)});
    let res3 = await result4.save();
    //console.log(res2);
    res.send(res3);
})

app.get("/getsinglebookingdetail/:bid", async function (req, res) {
    let result3 = await Bill.findOne({bill_id: parseInt(req.params.bid)});
    console.log(result3)
    //let result2 = await Booking.find({ booking_id: parseInt(result3[0].booking_id) });
    let result2 = await Booking.aggregate([{$match: {$and: [{booking_id:{$eq: parseInt(result3.booking_id)}}]}},{$lookup:{ from: "machinery_details",localField: "machinery_id",foreignField: "machinery_id",as: "machinery"}}]);
    res.send(result2);
})


app.get("/getallbookingdetail/:fid", async function (req, res) {
  
    let result2 = await Booking.aggregate([{$match: {$and: [{farmer_id:{$eq: parseInt(req.params.fid)}}]}},{$lookup:{ from: "machinery_details",localField: "machinery_id",foreignField: "machinery_id",as: "machinery"}}]);
    res.send(result2);
})

app.get("/farmergetsinglebookingdetail/:bid", async function (req, res) {
 
    let result2 = await Booking.aggregate([{$match: {$and: [{booking_id:{$eq: parseInt(req.params.bid)}}]}},{$lookup:{ from: "machinery_details",localField: "machinery_id",foreignField: "machinery_id",as: "machinery"}}]);
    res.send(result2);
})


app.get("/admingetallbookingdetail", async function (req, res) {
  
    let result2 = await Booking.aggregate([{$lookup:{ from: "machinery_details",localField: "machinery_id",foreignField: "machinery_id",as: "machinery"}}]);
    res.send(result2);
})

app.get("/getfarmerdetail", async function (req, res) {
 
    let result2 = await Farmer.find();
    res.send(result2);
})

app.get("/adminmachinebookingdetail/:mid", async function (req, res) {
    let result2 = await Booking.aggregate([{$match: {$and: [{machinery_id:{$eq: parseInt(req.params.mid)}}]}},{$lookup:{ from: "machinery_details",localField: "machinery_id",foreignField: "machinery_id",as: "machinery"}}]);
    res.send(result2);
})

app.get("/getdatewisebookingreport/:sdate/:edate",async function(req,res){
    console.log(req.params.sdate," ",req.params.edate);
    let sdate = new Date(req.params.sdate);
    sdate.setDate(sdate.getDate() - 1);
    let edate = new Date(req.params.edate);
    edate.setDate(edate.getDate() + 1);
    console.log(sdate," ",edate);
    let result2 = await Booking.aggregate([{$match: {$and: [{booking_date: {$gte: new Date(sdate)}},{booking_date: {$lte: new Date(edate)}}]}},{$lookup:{ from: "machinery_details",localField: "machinery_id",foreignField: "machinery_id",as: "machinery"}}]);
   
    console.log(result2);
    res.send(result2);
})

app.get("/getmachineryhighestbookingdetail", async function (req, res) {
    //let totalmarks = await Booking.find({machinery_id: parseInt(req.body.examid)}).count()
    // console.log(result2);
     //res.send({total: result2});
     //console.log(totalmarks);
    let result2 = await Machinery.find();
    result2 = JSON.parse(JSON.stringify(result2));
    for(i=0;i<result2.length;i++)
    {
        let totalbooking = await Booking.find({machinery_id: parseInt(result2[i].machinery_id)}).count()
        console.log(totalbooking);
        
            result2[i].totalbooking = totalbooking;
        

    }
    console.log(result2);
    res.send(result2);

})

app.listen(5000, "localhost", function () {
    console.log("server Started At Port No 5000");
})