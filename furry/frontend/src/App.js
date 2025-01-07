// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SettingsPage from './pages/Admin/SettingsPage';
import ManageVeterinary from './pages/Admin/ManageVeterinary';
import ManageVaccination from './pages/Admin/ManageVaccination';
import ManagePetRequest from './pages/Admin/ManagePetRequest';
import ManagePetDog from './pages/Admin/ManagePetDog';
import ManageDonation from './pages/Admin/ManageDonation';
import Managework from "./pages/Admin/Managework";
import ManageVolunteer from "./pages/Admin/ManageVolunteer";
import ManageRescue from "./pages/Admin/ManageRescue";
import ManageGallery from "./pages/Admin/ManageGallery";
import RegistrationForm from "./pages/RegistrationForm";

import UserDashboard from "./pages/User/UserDashboard";
import ViewWork from "./pages/User/ViewWork";
import ViewVaccination from "./pages/User/ViewVaccination";
import ViewGallery from "./pages/User/ViewGallery";
import ViewAdoptPet from "./pages/User/ViewAdoptPet";
import ViewVeterinary from "./pages/User/View Veterinary";
import UserSettings from "./pages/User/Settings";
import PetRequest from "./pages/User/ManagePetRequest";
import AddRescue from "./pages/User/AddRescue";
import AddDonation from "./pages/User/AddDonation";



function Home() {
const navigate = useNavigate(); // Hook for navigation

return (
  <div className="video-container">
    <video autoPlay muted loop>
      <source src="Rig-img.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <button className="center-button" onClick={() => navigate('/Login')}>
      Go to Login
    </button>
  </div>
);
}



function App() {
  

  return (


    <>
    {/* <Login/> */}
      <BrowserRouter>
         <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/Login' element={<Login/>}/>
         <Route path="/register" element={<RegistrationForm/>} />

         {/* admin */}
         <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
         <Route path="/admin/settings" element={<SettingsPage/>} />
         <Route path="/admin/manage-veterinary" element={<ManageVeterinary />} />
         <Route path="/admin/manage-vaccination" element={<ManageVaccination />} />
         <Route path="/admin/manage-pet-request" element={<ManagePetRequest />} />
         <Route path="/admin/manage-pet-dog" element={<ManagePetDog />} />
         <Route path="/admin/manage-donation" element={<ManageDonation />} />
         <Route path="/admin/manage-work" element={<Managework />} />
         <Route path="/admin/manage-volunteer" element={<ManageVolunteer />} />
         <Route path="/admin/manage-rescue" element={<ManageRescue />} />
         <Route path="/admin/manage-gallery" element={<ManageGallery />} />
         
         {/* user */}
         <Route path="/user-dashboard" element={<UserDashboard/>} />
         <Route path="/user-dashboard/user/view-work" element={<ViewWork/>} />
         <Route path="/user-dashboard/user/view-vaccination" element={<ViewVaccination/>} />
         <Route path="/user-dashboard/user/view-gallery" element={<ViewGallery/>} />
         <Route path="/user-dashboard/user/view-adopt-pet" element={<ViewAdoptPet/>} />
         <Route path="/user-dashboard/user/view-veterinary" element={<ViewVeterinary/>} />
         <Route path="/user-dashboard/user/settings" element={<UserSettings/>} />
         <Route path="/user-dashboard/user/manage-pet-request" element={<PetRequest/>} />
         <Route path="/user-dashboard/user/add-rescue" element={<AddRescue/>} />
         <Route path="/user-dashboard/user/add-donation" element={<AddDonation/>} />

        

         </Routes>
     </BrowserRouter>
    </>



);
}




export default App;
