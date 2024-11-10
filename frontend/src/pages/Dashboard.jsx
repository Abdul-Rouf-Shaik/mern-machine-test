import { Button } from "@/components/ui/button";
import React from "react";
import { HiOutlineHome, HiOutlineUser, HiOutlineCog } from "react-icons/hi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="text-white flex pt-14 lg:pt-14">
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-center items-center mb-16">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome to Admin Dashboard!!
          </h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl font-bold mt-4">1,234</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Active Orders</h3>
            <p className="text-3xl font-bold mt-4">523</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">New Signups</h3>
            <p className="text-3xl font-bold mt-4">87</p>
          </div>
        </div>

        {/* add new employee btn */}
        <div className="w-ful flex justify-center mt-20">
        <Link to={"/create-employee"}>
          <Button className=" p-7 text-xl lg:p-10 bg-[#1C4ED8] hover:bg-[#1c4ed8d9] text-white">
            Add a new employee
          </Button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
