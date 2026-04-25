import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Farmer_Registration from './Farmer_Registration';
import Private_Component from './Private_Component';
import Admin_View_Machinery_Type from './Admin_View_Machinery_Type';
import Admin_Add_Machinery_Type from './Admin_Add_Machinery_Type';
import Admin_Update_Machinery_Type from './Admin_Update_Machinery_Type';
import Admin_View_Machinery from './Admin_View_Machinery';
import Admin_Add_Machinery from './Admin_Add_Machinery';
import Admin_Update_Machinery from './Admin_Update_Machinery';
import Farmer_View_Machinery from './Farmer_View_Machinery';
import Farmer_View_Machinery_Detail from './Farmer_View_Machinery_Detail';
import Farmer_Bill from './Farmer_Bill';
import Farmer_View_All_Booking from './Famer_View_All_Booking';
import Farmer_View_Bill from './Farmer_View_Bill';
import Admin_View_All_Booking from './Admin_View_All_Booking';
import Admin_View_Machinery_Report from './Admin_View_Machinery_Report';
import Admin_View_Machine_Wise_Booking_Report from './Admin_View_Machine_Wise_Booking_Report';
import Admin_View_DateWise_Booking_Report from './Admin_View_DateWise_Booking_Report';
import Admin_View_Farmer_Detail_Report from './Admin_View_Farmer_Detail_Report';
import Admin_View_FarmerWise_Booking_Report from './Admin_View_FarmerWise_Booking_Report';
import Admin_View_Highest_Machine_Booking_Report from './Admin_View_Highest_Machine_Booking_Report';
function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes >
          <Route element={<Private_Component />}>
            <Route path='/admin_view_machinery_type' element={<Admin_View_Machinery_Type />} />
            <Route path='/admin_add_machinery_type' element={<Admin_Add_Machinery_Type />} />
            <Route path='/admin_update_machinery_type/:tid' element={<Admin_Update_Machinery_Type />} />
            <Route path='/admin_view_machinery' element={<Admin_View_Machinery />} />
            <Route path='/admin_add_machinery' element={<Admin_Add_Machinery />} />
            <Route path='/admin_update_machinery/:mid' element={<Admin_Update_Machinery />} />
            <Route path='/admin_view_all_booking' element={<Admin_View_All_Booking />} />
            <Route path='/admin_view_machinery_report' element={<Admin_View_Machinery_Report />} />
            <Route path='/admin_view_machine_wise_booking_report/:mid' element={<Admin_View_Machine_Wise_Booking_Report />} />
            <Route path='/admin_view_datewise_booking_report' element={<Admin_View_DateWise_Booking_Report />} />
            <Route path='/admin_view_farmer_detail_report' element={<Admin_View_Farmer_Detail_Report />} />
            <Route path='/admin_view_farmerwise_booking_report/:fid' element={<Admin_View_FarmerWise_Booking_Report />} />
            <Route path='/admin_view_highest_machine_booking_report' element={<Admin_View_Highest_Machine_Booking_Report />} />
          </Route>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/farmer_regis' element={<Farmer_Registration />}/>
          <Route path='/farmer_view_machinery' element={<Farmer_View_Machinery />}/>
          <Route path='/farmer_view_machinery_detail/:mid' element={<Farmer_View_Machinery_Detail />}/>
          <Route path='/farmer_bill/:bid' element={<Farmer_Bill />}/>
          <Route path='/farmer_view_all_booking' element={<Farmer_View_All_Booking />}/>
          <Route path='/farmer_view_bill/:bid' element={<Farmer_View_Bill />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}


export default App;
