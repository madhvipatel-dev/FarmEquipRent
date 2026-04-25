import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Farmer_View_Bill() {
    const params = useParams();
    const bid = params.bid;
    const [bill, setBill] = useState([]);
    const [booking, setBooking] = useState([]);




    useEffect(() => {
        getbookingdetail();
    }, [])

    /*useEffect(() => {
        getsinglebilldetail();
    }, [])
*/

    async function getbookingdetail() {
        const result = await fetch(`http://localhost:5000/farmergetsinglebookingdetail/${params.bid}`);
        const res = await result.json();
        setBooking(res);
        console.log(res);
    }

   /* async function getsinglebilldetail() {
        const result = await fetch(`http://localhost:5000/getsinglebilldetail/${params.bid}`)
        const res = await result.json();
        setBill(res);
        console.log(res);
    }*/


  
    return (
        <>
            <table border='1' align="center" style={{ width: "80%" }} className="table table-bordered">
                <tr>
                    <td colspan="2" align="center">
                        <img src="/assets/images/logo4.png" style={{ width: "250px", height: "100px" }} alt="" />
                        <br />
                        2<sup>nd</sup> Floor, Infinity Mall,<br/>
                    Tithal Road,<br/>
                    Valsad: 396001,<br/>
                    Gujarat (India)
                    </td>
                </tr>
            </table>
            <table className="table table-bordered" align="center" style={{ width: "80%", align: "center" }}>
                <thead>
                    <tr>
                        <td>BOOKING ID</td>
                        <td>BOOKING DATE</td>
                        <td>START TO END DATE</td>
                        <td>MACHINERY IMAGE</td>
                        <td>MACHINERY NAME</td>
                        <td>RENT PER DAY</td>
                        <td>NO OF DAYS</td>
                        <td>AMOUNT</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        booking.map((item,index) =>
                         <tr key={index}>
                             <td>{item.booking_id}</td>
                             <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                             <td>{new Date(item.start_date).toLocaleDateString()} to {new Date(item.end_date).toLocaleDateString()}</td>
                             <td><img src={"http://localhost:5000/machinery_img/" + item.machinery[0].machinery_img} style={{ width: "150px", height: "150px" }} /></td>
                            <td>{item.machinery[0].machinery_name}</td>
                            
                         
                         <td>{item.rent_per_day}</td>
                         <td>{item.no_of_days}</td>
                         <td>{item.amount}</td>
     
     
                     </tr>
                        )
                    }
                    <tr>
                        <td colspan="7">System generated bill, No signature Required.<br />
                        </td>
                        
                    </tr>
                    
                </tbody>
            </table>




        </>
    )
}

export default Farmer_View_Bill;