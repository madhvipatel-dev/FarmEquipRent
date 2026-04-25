import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Admin_View_Machinery_Type() {

    const navigate = useNavigate();
    const [type, setType] = useState([]);

    useEffect(() => {
        getTypeDetail();
    }, [])

    async function getTypeDetail() {
        const result = await fetch("http://localhost:5000/gettypedetail")
        const res = await result.json();
        setType(res);
        // console.log(res);
    }
    const deletetype = async (tid)=>{
        const result = await fetch(`http://localhost:5000/deletetype/${tid}`,{
          method: 'Delete'
        })
  
        let res = await result.json();
        if(res){
            getTypeDetail();
        }
      }
    return (
        <>
            <div classNameNam="contact">
                <div className="container">
                    <h3 className="title">VIEW MACHINERY TYPE DETAIL</h3>
                    
                    <div className="col-md-12">
                        <div className="contact-form">
                            
                                <Link to="/admin_add_machinery_type" className="btn btn-success">ADD MACHINERY TYPE</Link>
                                <br/>
                                {
                                    type.length > 0
                                        ?
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>TYPE ID</th>
                                                    <th>TYPE NAME</th>
                                                    <th>UPDATE</th>
                                                    <th>DELETE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    type.map((item, index) =>
                                                        <tr>
                                                            <td>{item.type_id}</td>
                                                            <td>{item.type_name}</td>
                                                            <td><Link className="btn btn-success" to={'/admin_update_machinery_type/' + item.type_id} >UPDATE</Link></td>
                                                            <td><button className="btn btn-success" onClick={() => deletetype(item.type_id)} >DELETE</button></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        :
                                        <h2>No Machinery Type Found</h2>
                                }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin_View_Machinery_Type;