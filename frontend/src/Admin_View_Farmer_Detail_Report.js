import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin_View_Farmer_Detail_Report() {
    
    const navigate = useNavigate();
    
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
  
    
    return (
        <>
            <div classNameNam="contact">
                <div className="container">
                    <h3 className="title">VIEW FARMER DETAIL REPORT</h3>
                    
                    <div className="col-md-12">
                        <div className="contact-form">
                            
                               
                                {
                                    farmer.length > 0
                                        ?
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>FARMER ID</th>
                                                    <th>FARMER NAME</th>
                                                    <th>ADDRESS</th>
                                                    <th>CITY</th>
                                                    
                                                    <th>MOBILE NO</th>
                                                    <th>EMAIL ID</th>
                                                    
                                                    <th>VIEW BOOKING</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    farmer.map((item, index) =>
                                                        <tr>
                                                            <td>{item.farmer_id}</td>
                                                            <td>{item.farmer_name}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.city}</td>
                                                            <td>{item.mobile_no}</td>
                                                            <td>{item.email_id}</td>
                                                                                 
                         
                                                            <td><Link className="btn btn-success" to={'/admin_view_farmerwise_booking_report/' + item.farmer_id} >VIEW BOOKING</Link></td>
                                                           
                                                            
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

export default Admin_View_Farmer_Detail_Report;