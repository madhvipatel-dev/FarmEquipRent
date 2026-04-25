import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function Farmer_View_Machinery_Detail() {
    const params = useParams();
    const navigate = useNavigate();
    let farmerid = localStorage.getItem("farmerid");
    const [name, setName] = useState("");
    const [typeid, setTypeid] = useState("");
    const [description, setDescription] = useState("");
    const [rday, setRday] = useState("");
    const [imgpath, setImgpath] = useState("");
    const [loading,setLoading] = useState(false);
    const [type, setType] = useState([]);
    const [ndays,setNdays] = useState(0);
    const [amt,setAmt] = useState(0);
    const [sdate, setSdate] = useState(new Date().toISOString().substring(0, 10));
    const [edate, setEdate] = useState(new Date().toISOString().substring(0, 10));

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
        setImgpath("http://localhost:5000/machinery_img/" + res.machinery_img);
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

    const handledata = async (e) => {
        e.preventDefault();
        let mid = params.mid;
        let difftime = new Date(edate).getTime() - new Date(sdate).getTime();
        let ddays = Math.round(difftime /(1000*3600*24));
        setNdays(ddays+1);
        const result = await fetch("http://localhost:5000/farmer_check_avaibility",{
            method: "post",
            body: JSON.stringify({sdate,edate,mid}),
            headers: {
                "Content-Type" :"application/json"
            }
        })

        let res = await result.json();
        if(res.result=="Machine is Booked For This Date"){
            alert("Machinery Not Available For This Date");
         
        }else{
            //alert(res.result);
            
            setLoading(true);
            setAmt((ddays+1)*parseInt(rday));
        }
    }

    const bookmachinery = async (e) => {
        e.preventDefault();
        let mid = params.mid;
        
        
        const result = await fetch("http://localhost:5000/farmer_book_machinery",{
            method: "post",
            body: JSON.stringify({sdate,edate,mid,ndays,amt,farmerid,rday}),
            headers: {
                "Content-Type" :"application/json"
            }
        })

        let res = await result.json();
        if(res){
            alert("Machinery Book Successfully");
            navigate("/farmer_bill/"+res.bill_id);
        }else{
            //alert(res.result);
            alert("Machinery Not Available For This Date");

        }
    }

    return (
        <>
            <div class="contact">
                <div class="container">
                    <h3 class="title">Machinery Detail</h3>
                    <div class="col-md-6">
                        <img src={imgpath} class="img-responsive" alt="" />
                    </div>
                    <div class="col-md-6">
                        <div class="contact-form">
                            <form method="post"  >
                                <h4>Machinery Name: {name}</h4>
                                <br />
                                <h4>Description: {description}</h4>
                                <br />
                                <h4>Rent Per Day: &#8377; {rday} /-</h4>
                                <br />
                                Select Booking Start Date
                                <input type="date" name="txtsdate" placeholder="Enter Booking Start Date" value={sdate} min={sdate} onChange={(e) => setSdate(e.target.value)}  disabled={loading}/>
                                Select Booking End Date
                                <input type="date" name="txtedate" placeholder="Enter Booking Start Date" value={edate} min={sdate} onChange={(e) => setEdate(e.target.value)} disabled={loading} />

                            
                              {  loading
                                ?
                                    <>
                                    Total Amount
                                    <input type="text" name="txtamt" value={amt} onChange={(e) => setAmt(e.target.value)} disabled/>
                                    <input type="submit" value="BOOK MACHINERY" name="btnbook" onClick={bookmachinery}/>
                                    </>
                                
                                :
                                <input type="submit" value="CHECK AVAIBILITY" name="btnlogin" onClick={handledata}/>
                                                            
                              }
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Farmer_View_Machinery_Detail;