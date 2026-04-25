import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    let auth = localStorage.getItem("admin_email");
    let farmerid = localStorage.getItem("farmerid");
    const [x,setX] = useState(false);
    const navigate = useNavigate();
    function logout2() {

        localStorage.clear();
        navigate("/")

    }

    return (
        <>
            {
                auth
                    ?
                    <>
                        <div className="logo">
                            <div className="container">
                                <div className="logo-info">
                                    <a href="#">
                                        <img src="/assets/images/logo4.png" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="top-nav">
                            <nav className="navbar navbar-default">
                                <div className="container">
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">Menu
                                    </button>
                                </div>

                                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul className="nav navbar-nav">
                                        <li className="hvr-bounce-to-bottom "><Link to="/admin_view_machinery_type">Machinery Type</Link></li>
                                        <li className="hvr-bounce-to-bottom"><Link to="/admin_view_machinery">Machinery</Link></li>
                                        <li className="hvr-bounce-to-bottom"><Link to="/admin_view_all_booking">View Booking</Link></li>
                                      
                                        <li><Link  className=" dropdown-toggle hvr-bounce-to-bottom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >Reports<span className="caret"></span></Link>
                                            <ul className="dropdown-menu ">
                                                <li><Link className="hvr-bounce-to-bottom" to="/admin_view_machinery_report">Machine Wise Booking Report</Link></li>
                                                <li><Link className="hvr-bounce-to-bottom" to="/admin_view_datewise_booking_report">Date Wise Booking Report</Link></li>
                                                <li><Link className="hvr-bounce-to-bottom" to="/admin_view_all_booking">All Booking Report</Link></li>
                                                <li><Link className="hvr-bounce-to-bottom" to="/admin_view_farmer_detail_report">Farmer Detail Report</Link></li>
                                                <li><Link className="hvr-bounce-to-bottom" to="/admin_view_highest_machine_booking_report">Highest Machine Booking Report</Link></li>
                                            </ul>
                                        </li>
                                        <li className="hvr-bounce-to-bottom"><Link onClick={logout2} to="/">Logout</Link></li>
                                    </ul>
                                    <div className="clearfix"> </div>
                                </div>
                            </nav>
                        </div>
                    </>
                    :
                    farmerid
                        ?
                        <>
                            <div className="logo">
                                <div className="container">
                                    <div className="logo-info">
                                        <a href="#">
                                            <img src="/assets/images/logo4.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="top-nav">
                                <nav className="navbar navbar-default">
                                    <div className="container">
                                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">Menu
                                        </button>
                                    </div>

                                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <ul className="nav navbar-nav">
                                            <li className="hvr-bounce-to-bottom "><Link to="/farmer_view_machinery">View Machinery</Link></li>
                                            <li className="hvr-bounce-to-bottom"><Link to="/farmer_view_all_booking">View Bookings</Link></li>

                                            <li className="hvr-bounce-to-bottom"><Link onClick={logout2} to="/">Logout</Link></li>
                                        </ul>
                                        <div className="clearfix"> </div>
                                    </div>
                                </nav>
                            </div>
                        </>




                        :
                        <>
                            <div className="logo">
                                <div className="container">
                                    <div className="logo-info">
                                        <a href="#">
                                            <img src="/assets/images/logo4.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="top-nav">
                                <nav className="navbar navbar-default">
                                    <div className="container">
                                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">Menu
                                        </button>
                                    </div>

                                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <ul className="nav navbar-nav">
                                            <li className="hvr-bounce-to-bottom "><Link to="/">Home</Link></li>
                                            <li className="hvr-bounce-to-bottom"><Link to="/about">About</Link></li>
                                            <li className="hvr-bounce-to-bottom"><Link to="/farmer_regis">Farmer Registration</Link></li>
                                            <li className="hvr-bounce-to-bottom"><Link to="/login">Login</Link></li>
                                            <li className="hvr-bounce-to-bottom"><Link to="/contact">Contact Us</Link></li>
                                        </ul>
                                        <div className="clearfix"> </div>
                                    </div>
                                </nav>
                            </div>
                        </>

            }

        </>
    )
}

export default Navbar;