import { Outlet } from "react-router-dom";
import AsideNavbar from "../../Dashboard Components/AsideNavbar";

const DashboardLayout = () => {
    
  return (
    <div className="flex h-screen bg-gray-100">
      <AsideNavbar/>
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}


export default DashboardLayout;