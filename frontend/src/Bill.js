import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Bill() {
    const params = useParams();
    const bid = params.bid;
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    let tot = 0;



    useEffect(() => {
        getproductdetail();
    }, [])

    useEffect(() => {
        getbilldetail();
    }, [])


    async function getproductdetail() {
        const result = await fetch("http://localhost:5000/getproductdetail")
        const res = await result.json();
        setProduct(res);
        console.log(res);
    }

    async function getbilldetail() {
        const result = await fetch(`http://localhost:5000/getbilldetail/${params.bid}`)
        const res = await result.json();
        setData(res);
        console.log(res);
    }


    const fillTable = data.map((item, index) => {
       
            
            tot = tot + (parseInt(item.qty) * parseInt(item.price));
            return (
                <tr key={index}>
                    {
                        product.map((fitem, findex) =>
                            fitem.product_id == item.product_id ?
                                <>
                                    <td><img src={"http://localhost:5000/prod_img/" + fitem.product_img} style={{ width: "150px", height: "150px" }} /></td>
                                    <td>{fitem.product_name}</td>
                                </>
                                :
                                null
                        )
                    }
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                    <td>{item.qty * item.price}</td>


                </tr>
            )
        
    });
    return (
        <>
            <table border='1' align="center" style={{ width: "80%" }} className="table table-bordered">
                <tr>
                    <td colspan="2" align="center">
                        <img src="/assets/img/logo6.png" style={{ width: "200px", height: "90px" }} alt="" />
                        <br />
                        <br />Business Park Mall,<br /> Near Dharampur Chowkdi<br /> Valsad: 396001
                    </td>
                </tr>
            </table>
            <table className="table table-bordered" align="center" style={{ width: "80%", align: "center" }}>
                <thead>
                    <tr>
                        <td>PRODUCT IMAGE</td>
                        <td>PRODUCT NAME</td>
                        <td>QUANTITY</td>
                        <td>PRICE</td>
                        <td>AMOUNT</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        fillTable
                    }

                    <tr>
                        <td colspan="4">System generated bill, No signature Required.<br />
                        </td>
                        <td>Total Amount ₹ {tot } /-</td>
                    </tr>
                    
                </tbody>
            </table>




        </>
    )
}

export default Bill;