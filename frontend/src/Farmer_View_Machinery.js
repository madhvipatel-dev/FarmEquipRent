import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Farmer_View_Machinery() {

    const navigate = useNavigate();
    const [machinery, setMachinery] = useState([]);
    const [type, setType] = useState([]);
    useEffect(() => {
        getTypeDetail();
    }, [])

    async function getTypeDetail() {
        const result = await fetch("http://localhost:5000/gettypedetail")
        const res = await result.json();
        setType(res);
        console.log(res);
    }
    useEffect(() => {
        getmachinerydetail();
    }, [])

    async function getmachinerydetail() {
        const result = await fetch("http://localhost:5000/getmachinerydetail")
        const res = await result.json();
        setMachinery(res);
        // console.log(res);
    }
    const deletemachinery = async (mid) => {
        const result = await fetch(`http://localhost:5000/deletemachinery/${mid}`, {
            method: 'Delete'
        })

        let res = await result.json();
        if (res) {
            getmachinerydetail();
        }
    }

    const fetch_machinery_typewise = async (tid) => {
        const result = await fetch(`http://localhost:5000/getmachinerytypewise/${tid}`)
        const res = await result.json();
        setMachinery(res);
        console.log(res);
    }
    return (
        <>
            <div className="gallery">
                <div className="container">
                    <h3 className="title">Our Machinery</h3>
                    <div className="row">
                        <div className="col-md-3 mt-5 gallery-grids">
                            <h3>Macinery Type</h3>
                            <ul id="portfolio-flters">
                                <li style={{ marginTop: "10px" }}><h4><Link onClick={() => fetch_machinery_typewise("0")}>All</Link></h4></li>
                                {
                                    type.map((item2, index2) =>
                                        <li style={{ marginTop: "10px" }}><h4><Link onClick={() => fetch_machinery_typewise(item2.type_id)}>{item2.type_name}</Link></h4></li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <div className="gallery-grids">
                                {
                                    machinery.length > 0
                                        ?
                                        machinery.map((item, index) =>
                                            <div className="col-md-6 port-grids view view-fourth">
                                                <Link className="example-image-link" to={"/farmer_view_machinery_detail/"+item.machinery_id} data-lightbox="example-set" data-title="">
                                                    <img src={"http://localhost:5000/machinery_img/"+item.machinery_img} style={{width: "341px",height:"256px"}}className="img-responsive" alt="" />
                                                    <div className="mask">
                                                        <p><h3>{item.machinery_name}</h3>
                                                        <h4>Rent: &#8377; {item.rent_per_day}/-</h4>
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>

                                        )
                                        :
                                        <h2>No Machinery Found</h2>

                                }






                                <div className="clearfix"> </div>
                                <script src="js/lightbox-plus-jquery.min.js"> </script>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Farmer_View_Machinery;