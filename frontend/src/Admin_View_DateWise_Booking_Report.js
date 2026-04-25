import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
function Admin_View_DateWise_Booking_Report() {

    const navigate = useNavigate();
    const [sdate, setSdate] = useState(new Date().toISOString().substring(0, 10));
    const [edate, setEdate] = useState(new Date().toISOString().substring(0, 10));
    const [booking, setBooking] = useState([]);
    const [farmer, setFarmer] = useState([]);
    useEffect(() => {
        getfarmerdetail();
    }, [])

    async function getfarmerdetail() {
        const result = await fetch("http://localhost:5000/getfarmerdetail")
        const res = await result.json();
        setFarmer(res);
        //console.log(res);
    }
    async function getdatewisebookingreport() {
        const result = await fetch(`http://localhost:5000/getdatewisebookingreport/${sdate}/${edate}`)
        const res = await result.json();
        setBooking(res);
        console.log(res);
    }





    const [errors, setErrors] = useState({

    });


    const x = {};

    const handleValidation = (e) => {
        e.preventDefault();


        var v = /^[a-zA-Z0-9 ]{2,50}$/;
        if (sdate == "") {
            x.sdate = "Please Select Start Date";
        }
        else {
            x.sdate = ""
        }

        if (edate == "") {
            x.edate = "Please Select End Date";
        }
        else {
            x.edate = ""
        }

        setErrors(x);
        if (x.sdate == "" && x.edate == "") {
            //alert("REgister");
            getdatewisebookingreport();
        } else {
            console.log(errors);
            console.log(x);
            alert("Error Found");
        }
    }


    return (
        <>
            <div class="contact">
                <div class="container">
                    <h3 class="title">DATE WISE BOOKING REPORT</h3>

                    <div class="col-md-6">
                        <div class="contact-form">
                            <form method="post" onSubmit={handleValidation}>
                                <input type="date" name="txtsdate" value={sdate} onChange={(e) => setSdate(e.target.value)} />
                                {errors.sdate ? <p style={{ color: "red" }}>{errors.sdate}</p> : null}
                                <input type="date" name="txtsdate" value={edate} onChange={(e) => setEdate(e.target.value)} />
                                {errors.edate ? <p style={{ color: "red" }}>{errors.edate}</p> : null}
                                <input type="submit" value="VIEW REPORT" name="btnreport" />

                            </form>
                        </div>
                    </div>
                    <div className="col-md-12">
                    {
                                    booking.length > 0
                                        ?
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>BOOKING ID</th>
                                                    <th>BOOKING DATE</th>
                                                    <th>FARMER NAME</th>
                                                    <th>MACHINERY NAME</th>
                                                    
                                                    <th>START DATE</th>
                                                    <th>END DATE</th>
                                                    <th>NO OF DAYS</th>
                                                    <th>RENT PER DAY</th>
                                                    <th>AMOUNT</th>
                                                    <th>MACHINERY IMAGE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    booking.map((item, index) =>
                                                        <tr>
                                                            <td>{item.booking_id}</td>
                                                            <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                                                            <td>{
                                                                farmer.map((item2, index2) =>
                                                                    item2.farmer_id == item.farmer_id
                                                                        ?
                                                                        item2.farmer_name
                                                                        :
                                                                        null
                                                                )
                                                            }</td>
                                                             <td>{item.machinery[0].machinery_name}</td>
                                                            <td>{new Date(item.start_date).toLocaleDateString()} </td>
                                                            <td>{new Date(item.end_date).toLocaleDateString()}</td>
                                                            
                                                           
                                                            <td>{item.no_of_days}</td>
                                                            <td>{item.rent_per_day}</td>
                                                            <td>{item.amount}</td>
                         
                         
                                                            <td><img src={"http://localhost:5000/machinery_img/" + item.machinery[0].machinery_img} style={{ width: "150px", height: "150px" }}></img></td>
                                                           
                                                            
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <h2>No Booking Found</h2>
                                }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin_View_DateWise_Booking_Report;