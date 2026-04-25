import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin_View_Machinery() {

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
    const deletemachinery = async (mid)=>{
        const result = await fetch(`http://localhost:5000/deletemachinery/${mid}`,{
          method: 'Delete'
        })
  
        let res = await result.json();
        if(res){
            getmachinerydetail();
        }
      }
    return (
        <>
            <div classNameNam="contact">
                <div className="container">
                    <h3 className="title">VIEW MACHINERY DETAIL</h3>
                    
                    <div className="col-md-12">
                        <div className="contact-form">
                            
                                <Link to="/admin_add_machinery" className="btn btn-success">ADD MACHINERY TYPE</Link>
                                <br/>
                                {
                                    machinery.length > 0
                                        ?
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>MACHINERY ID</th>
                                                    <th>MACHINERY NAME</th>
                                                    <th>TYPE NAME</th>
                                                    <th>DESCRIPTION</th>
                                                    <th>RENT PER DAY</th>
                                                    <th>MACHINERY IMAGE</th>
                                                    <th>UPDATE</th>
                                                    <th>DELETE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    machinery.map((item, index) =>
                                                        <tr>
                                                            <td>{item.machinery_id}</td>
                                                            <td>{item.machinery_name}</td>
                                                            <td>{
                                                                type.map((item2, index2) =>
                                                                    item2.type_id == item.type_id
                                                                        ?
                                                                        item2.type_name
                                                                        :
                                                                        null
                                                                )
                                                            }</td>
                                                            <td>{item.description}</td>
                                                            <td>{item.rent_per_day}</td>
                                                            <td><img src={"http://localhost:5000/machinery_img/" + item.machinery_img} style={{ width: "150px", height: "150px" }}></img></td>
                                                            <td><Link className="btn btn-success" to={'/admin_update_machinery/' + item.machinery_id} >UPDATE</Link></td>
                                                            <td><button className="btn btn-success" onClick={() => deletemachinery(item.machinery_id)} >DELETE</button></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <h2>No Machinery Found</h2>
                                }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin_View_Machinery;