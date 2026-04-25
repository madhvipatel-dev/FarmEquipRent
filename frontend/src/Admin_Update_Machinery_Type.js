import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
function Admin_Update_Machinery_Type() {

    const params = useParams();
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [error,setError]= useState({

    })

     useEffect(() => {
            getsingleTypeDetail();
        }, [])
    
        async function getsingleTypeDetail() {
            const result = await fetch(`http://localhost:5000/getsingletypedetail/${params.tid}`)
            const res = await result.json();
            setName(res.type_name);
            // console.log(res);
        }

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
            updatemachinerytype();
        }else{
            alert("Error Found");
        }
    }


    const updatemachinerytype = async () => {
        const result = await fetch(`http://localhost:5000/updatetype/${params.tid}`,{
            method: "put",
            body: JSON.stringify({name}),
            headers: {
                "Content-Type" :"application/json"
            }
        })

        let res = await result.json();
        if(res){
            alert("Record Updated Successfully");
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

                                <input type="submit" value="UPDATE" name="btnupdate" />
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin_Update_Machinery_Type;