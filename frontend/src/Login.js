import { Link, useNavigate, } from "react-router-dom";
import { useState } from "react";
function Login() {

    const navigate = useNavigate();
     const [email,setEmail]= useState("");
        const [pwd,setPwd]= useState("");

        const handledata = async (e) => {
            e.preventDefault();
            const result = await fetch("http://localhost:5000/loginfarmer",{
                method: "post",
                body: JSON.stringify({email,pwd}),
                headers: {
                    "Content-Type" :"application/json"
                }
            })
    
            let res = await result.json();
            if(res.farmer_name){
                localStorage.setItem("farmerid",res.farmer_id);
                navigate("/farmer_view_machinery");    
                //alert("Farmer Login Successfully");

                
            }else if(res.result=="Admin Login Succesfully"){
                localStorage.setItem("admin_email","xyz");
                //alert("Admin Login Successfully");
                navigate("/admin_view_machinery_type");
            }
            else{
                alert(res.result);
            }
    
        }
    return (
        <>
            <div class="contact">
                <div class="container">
                    <h3 class="title">Login</h3>
                    <div class="col-md-6">
                        <img src="/assets/images/log1.gif" class="img-responsive" alt="" />
                    </div>
                    <div class="col-md-6">
                        <div class="contact-form">
                            <form method="post" onSubmit={handledata}>
                                <input type="text"  name="txtemail" placeholder="Enter Email ID" value={email} onChange={(e)=>setEmail(e.target.value)} />

                                <input type="password" placeholder="*******" name="txtpwd" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                                <input type="submit" value="LOGIN" name="btnlogin" />
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;