import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin_View_FarmerWise_Booking_Report() {
    const params = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    useEffect(() => {
        getallbookingdetail();
    }, [])

    async function getallbookingdetail() {
        const result = await fetch(`http://localhost:5000/getallbookingdetail/${params.fid}`);
        const res = await result.json();
        setBooking(res);
        console.log(res);
    }
    
    return (
        <>
            <div classNameNam="contact">
                <div className="container">
                    <h3 className="title">FARMER WISE BOOKING DETAIL REPORT</h3>
                    
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
                                                    <th>MACHINERY NAME</th>
                                                    <th>START DATE</th>
                                                    <th>END DATE</th>
                                                    <th>NO OF DAYS</th>
                                                    <th>RENT PER DAY</th>
                                                    <th>AMOUNT</th>
                                                    <th>VIEW BILL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    booking.map((item, index) =>
                                                        <tr>
                                                            <td>{item.booking_id}</td>

                                                            <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                                                            <td>{item.machinery[0].machinery_name}</td>
                                                            <td>{new Date(item.start_date).toLocaleDateString()} </td>
                                                            <td>{new Date(item.end_date).toLocaleDateString()}</td>
                                                            
                                                            <td>{item.no_of_days}</td>
                                                            <td>{item.rent_per_day}</td>
                                                            <td>{item.amount}</td>
                         
                         
     
                                                            <td><Link className="btn btn-success" to={'/farmer_view_bill/' + item.booking_id} >VIEW BILL</Link></td>
                                                            
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

export default Admin_View_FarmerWise_Booking_Report;