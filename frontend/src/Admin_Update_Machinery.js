import { Link, useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
function Admin_Update_Machinery() {
    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [typeid, setTypeid] = useState("");
    const [description, setDescription] = useState("");
    const [rday, setRday] = useState("");
    const [imgpath, setImgpath] = useState("");
    const [type, setType] = useState([]);

    const handlefile = (e) => {
        setImgpath(e.target.files[0]);
    }
    useEffect(() => {
        getsinglemachinerydetail();
    }, [])

    async function getsinglemachinerydetail() {
        const result = await fetch(`http://localhost:5000/getsinglemachinerydetail/${params.mid}`)
        const res = await result.json();
        setName(res.machinery_name);
        setTypeid(res.type_id);
        setDescription(res.description);
        setRday(res.rent_per_day);
        setImgpath("http://localhost:5000/machinery_img/"+res.machinery_img);
        //console.log(res);
    }

    useEffect(() => {
        getTypeDetail();
    }, [])

    async function getTypeDetail() {
        const result = await fetch("http://localhost:5000/gettypedetail")
        const res = await result.json();
        setType(res);
        // console.log(res);
    }
    const [error, setError] = useState({

    })

    const x = {};

    const handlevalidation = (e)=>{
        e.preventDefault();
        
  
        var v = /^[a-zA-Z ]{2,50}$/;
        if(name==""){
            x.name = "Please Enter Machinery name";
        }
        else if(!v.test(name)){
          x.name = "Please Enter Only Alphabets in Machinery Name"
        }
        else{
          x.name=""
        }
  
        if(typeid=="0"){
          x.typeid = "Please Select Type";
        }else{
          x.typeid=""
        }
        
  
        if(description==""){
          x.description = "Please Enter Machinery Description";
        }else{
          x.description=""
        }
        var v = /^[0-9]{2,10}$/;
        if(rday==""){
            x.rday = "Please Enter Machinery Rent Per Day";
        }else if(parseInt(rday)<=0){
          x.rday = "Please Enter Machinery Rent Per Day Greater Than 0";
        }else if(!v.test(rday)){
          x.rday = "Please Enter Only Digits in Machinery Rent Per Day"
        }
        else{
          x.rday=""
        }
  
        if(imgpath==""){
            x.imgpath = "Please Select Machinery Image";
        }else{
            x.imgpath = "";
        }

        setError(x);
        if(x.name=="" && x.typeid=="" && x.description=="" && x.rday =="" && x.imgpath == "")   
        {
          //alert("REgister");
          updatemachinery();
        }else{
          //console.log(error);
          //console.log(x);
          alert("Error Found");
        }
      }
  
  
      const updatemachinery = async ()=>{
        //console.log(cat);
  
        let formdata = new FormData();
        formdata.append("name",name);
        formdata.append("typeid",typeid);
        formdata.append("description",description);
        formdata.append("rday",rday);
        formdata.append("image1",imgpath);
        const result = await fetch(`http://localhost:5000/updatemachinery/${params.mid}`,{
            method : 'put',
            body: formdata
        })
  
        let res = await result.json();
        if(res){
         
          //console.log(res);
        
          alert("Machinery Updated Successfully");
          navigate("/admin_view_machinery");
          
        }
        else{
          alert("Check Your Data");
        }
      }
    return (
        <>
            <div class="contact">
                <div class="container">
                    <h3 class="title">UPDATE MACHINERY</h3>

                    <div class="col-md-6">
                        <div class="contact-form">
                            <form method="post" onSubmit={handlevalidation}>
                                <input type="text" name="txtname" placeholder="Enter Machinery Name" value={name} onChange={(e) => setName(e.target.value)} />
                                {error.name ? <p style={{ color: "red" }}>{error.name}</p> : null}
                                <select name="seltype" value={typeid} onChange={(e) => setTypeid(e.target.value)} >
                                    <option value="0">--Select Type--</option>
                                    {
                                        type.map((item, index) =>
                                            <option value={item.type_id}>{item.type_name}</option>
                                        )
                                    }
                                </select>
                                {error.typeid ? <p style={{ color: "red" }}>{error.typeid}</p> : null}
                                <textarea name="txtdesc" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                                {error.description ? <p style={{color: "red"}}>{error.description}</p> : null}
                                <input type="text"  name="txtprice" placeholder="Enter Rent Per Day" value={rday} onChange={(e)=>setRday(e.target.value)}/>
                                {error.rday ? <p style={{color: "red"}}>{error.rday}</p> : null}
                                <input type="file"  name="txtimg" onChange={handlefile}/>
                                {error.imgpath ? <p style={{color: "red"}}>{error.imgpath}</p> : null}
                                <img src={imgpath} style={{width: "150px",height:"150px"}} />
                                <input type="submit" value="UPDATE" name="btnupdate" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin_Update_Machinery;