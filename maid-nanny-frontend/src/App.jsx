import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchHelpers from "./pages/SearchHelpers";
import HelperProfile from "./pages/HelperProfile";
import MyBookings from "./pages/MyBookings";
import RegisterHousehold from "./pages/RegisterHousehold";
import RegisterHelper from "./pages/RegisterHelper";
import AdminPortal from "./pages/AdminPortal";
import HelperDashboard from "./pages/HelperDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { Navbar } from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/household" element={<RegisterHousehold />} />
        <Route path="/register/helper" element={<RegisterHelper />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        
        {/* Household Routes */}
        <Route path="/search" element={<SearchHelpers />} />
        <Route path="/helper/:id" element={<HelperProfile />} />
        <Route path="/bookings" element={<MyBookings />} />
        
        {/* Helper Routes */}
        <Route path="/helper/dashboard" element={<HelperDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/verify" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;