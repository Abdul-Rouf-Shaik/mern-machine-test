import Header from "@/components/Header";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen px-5 pt-10 container mx-auto">
          <Header />
           <Outlet />
      </main>
      <div className="text-center p-8 bg-gray-800 mt-10">
        Copyright @ DealsDray Online Pvt. Ltd. 2023. All Rights Reserved.
      </div>
    </div>
  );
};

export default AppLayout;
