import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Admin_Add_Machinery_Type() {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [error,setError]= useState({

    })

    const x={};

    const handlevalidation =(e)=>{
        e.preventDefault();
        var v= /^[a-zA-Z ]{2,50}$/
        if(name==""){
            x.name = "Please Enter Machinery Type Name";
        }else if(!v.test(name)){
            x.name = "Please Enter Only Alphabets in Machinery Type Name";
        }else{
            x.name ="";
        }


        setError(x);
        if(x.name=="" ){
            savemachinerytype();
        }else{
            alert("Error Found");
        }
    }


    const savemachinerytype = async () => {
        const result = await fetch("http://localhost:5000/savetype",{
            method: "post",
            body: JSON.stringify({name}),
            headers: {
                "Content-Type" :"application/json"
            }
        })

        let res = await result.json();
        if(res){
            alert("Record Saved Successfully");
            navigate("/admin_view_machinery_type");
        }else{
            alert(res.result);
        }

    }
    return (
        <>
            <div class="contact">
                <div class="container">
                    <h3 class="title">ADD MACHINERY TYPE</h3>
                 
                    <div class="col-md-6">
                        <div class="contact-form">
                            <form method="post" onSubmit={handlevalidation}>
                                <input type="text"  name="txtname" placeholder="Enter Machinery Type" value={name} onChange={(e)=>setName(e.target.value)} />
                                {error.name ? <p style={{color: "red"}}>{error.name}</p> : null}

                                <input type="submit" value="SAVE" name="btnsave" />
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin_Add_Machinery_Type;