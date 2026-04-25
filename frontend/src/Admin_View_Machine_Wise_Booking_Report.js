import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin_View_Machine_Wise_Booking_Report() {
    
    const navigate = useNavigate();
    const params = useParams();
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
    useEffect(() => {
        getallbookingdetail();
    }, [])

    async function getallbookingdetail() {
        const result = await fetch(`http://localhost:5000/adminmachinebookingdetail/${params.mid}`);
        const res = await result.json();
        setBooking(res);
       
    }
    
    return (
        <>
            <div classNameNam="contact">
                <div className="container">
                    <h3 className="title">MACHINERY WISE BOOKING REPORT</h3>
                    
                    <div className="col-md-12">
                        <div className="contact-form">
                            
                               
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
            </div>

        </>
    )
}

export default Admin_View_Machine_Wise_Booking_Report;