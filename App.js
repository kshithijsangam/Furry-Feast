import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
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

function App() {

  return (
    <>
    {/* <Login/> */}
      <BrowserRouter>
         <Routes>
         <Route path='/Login' element={<Login/>}/>
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
         <Route path="/register" element={<RegistrationForm/>} />
         </Routes>
     </BrowserRouter>
    </>

);
}




export default App;
