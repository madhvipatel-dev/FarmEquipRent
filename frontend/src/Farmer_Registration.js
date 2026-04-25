import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Farmer_Registration() {
    const navigate = useNavigate();
    const [name,setName]= useState("")
    const [add,setAdd]= useState("")
    const [city,setCity]= useState("")
    const [mno,setMno]= useState("")
    const [email,setEmail]= useState("")
    const [pwd,setPwd]= useState("")
    const [gender,setGender]= useState("")

    const [error,setError]= useState({

    })

    const x={};

    const handlevalidation =(e)=>{
        e.preventDefault();
        var v= /^[a-zA-Z ]{2,50}$/
        if(name==""){
            x.name = "Please Enter Your Name";
        }else if(!v.test(name)){
            x.name = "Please Enter Only Alphabets in Your Name";
        }else{
            x.name ="";
        }


        if(add==""){
            x.add = "Please Enter Your Address";
        }else{
            x.add ="";
        }

        if(city==""){
            x.city = "Please Enter Your City Name";
        }else if(!v.test(city)){
            x.city = "Please Enter Only Alphabets in Your City Name";
        }else{
            x.city ="";
        }

        var v= /^[0-9]{10,10}$/
        if(mno==""){
            x.mno = "Please Enter Your Mobile No";
        }else if(mno.length!=10){
            x.mno = "Please Enter Your Mobile No 10 Digit Long";
        }
        else if(!v.test(mno)){
            x.mno = "Please Enter Only Digits in Your Mobile no";
        }else{
            x.mno ="";
        }

        var v= /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.([a-zA-Z]{2,4})+$/
        if(email==""){
            x.email = "Please Enter Your Email Id";
        }else if(!v.test(email)){
            x.email = "Please Enter Valid Email ID";
        }else{
            x.email ="";
        }

        if(pwd==""){
            x.pwd = "Please Enter Your Password";
        }else if(pwd.length<6){
            x.pwd = "Please Enter Your Password More than 6 Characters";
        }
        else if(pwd.length>10){
            x.pwd = "Please Enter Your Password Less than 10 Characters";
        }else{
            x.pwd ="";
        }

        if(gender==""){
            x.gender  = "Please Select Gender";
        }else{
            x.gender ="";
        }

        setError(x);
        if(x.name=="" && x.add=="" && x.city=="" && x.mno=="" && x.email=="" && x.pwd=="" && x.gender==""){
            regisfarmer();
        }else{
            alert("Error Found");
        }
    }


    const regisfarmer = async () => {
        const result = await fetch("http://localhost:5000/regisfarmer",{
            method: "post",
            body: JSON.stringify({name,add,city,mno,email,pwd,gender}),
            headers: {
                "Content-Type" :"application/json"
            }
        })

        let res = await result.json();
        if(res.farmer_name){
            alert("Register Successfully");
            navigate("/login");
        }else{
            alert(res.result);
        }

    }

    return (
        <>
            <div class="contact">
                <div class="container">
                    <h3 class="title">FARMER REGISTRATION</h3>
                    <div class="col-md-6">
                        <br /><br /><br />
                        <img src="/assets/images/regis1.gif" class="img-responsive" alt="" />
                    </div>
                    <div class="col-md-6">
                        <div class="contact-form">
                            <form method="post" name="form1" onSubmit={handlevalidation}>
                                <input type="text" name="txtname" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                {error.name ? <p style={{color: "red"}}>{error.name}</p> : null}
                                <textarea name="txtadd" placeholder="Enter Address" value={add} onChange={(e)=>setAdd(e.target.value)}></textarea>
                                {error.add ? <p style={{color: "red"}}>{error.add}</p> : null}
                                <input type="text"  name="txtcity" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                                {error.city ? <p style={{color: "red"}}>{error.city}</p> : null}
                                <input type="text"  name="txtmno" placeholder="Enter Mobile no" value={mno} onChange={(e)=>setMno(e.target.value)}/>
                                {error.mno ? <p style={{color: "red"}}>{error.mno}</p> : null}

                                <input type="text"  name="txtemail" placeholder="Enter Email ID" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                {error.email ? <p style={{color: "red"}}>{error.email}</p> : null}

                                <input type="password"  placeholder="*******" name="txtpwd" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                                {error.pwd ? <p style={{color: "red"}}>{error.pwd}</p> : null}



                                Select Gender: <input type="radio" value="MALE" name="gender" onChange={(e)=>setGender(e.target.value)}/> MALE
                                <input type="radio" value="FEMALE" name="gender" onChange={(e)=>setGender(e.target.value)}/> FEMALE
                                {error.gender ? <p style={{color: "red"}}>{error.gender}</p> : null}
                                <br />
                                <br />

                                <input type="submit" value="REGISTER" name="btnregister" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Farmer_Registration;