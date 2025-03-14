import { Routes,Route } from "react-router-dom"
import AdminLayout from "./AdminLayout"
import AdminDashboard from "./AdminDashboard"
import { AdminBookings } from "./AdminBookings"
import { ManageAdmin } from "./ManageAdmin"
import { ManageCategories } from "./ManageCategories"
import { ManageCabs } from "./ManageCabs"



const AdminReoutes = () => {
  return (
    <div>
       <Routes>
       <Route path="/" element={<AdminLayout/>}>
       <Route index element={<AdminDashboard />} />
       <Route path="dashboard" element={<AdminDashboard />} />
       <Route path="bookings" element={<AdminBookings />} />
       <Route path="admins" element={<ManageAdmin />} />
       <Route path="categories" element={<ManageCategories />} />
       <Route path="cabs" element={<ManageCabs />} />

       
       </Route>

       </Routes>
    </div>
  )
}

export default AdminReoutes

