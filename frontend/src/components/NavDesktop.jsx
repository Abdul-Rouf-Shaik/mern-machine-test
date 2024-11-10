import React from 'react'
import { routes } from "./routes";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const NavDesktop = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send request to backend to clear the auth cookie
      await axios.post("/api/auth/logout", {}, { withCredentials: true });

      // Clear user data from localStorage
      localStorage.removeItem("user");

      // Show a success message
      toast("Logged out successfully", {
        type: "success",
        theme: "dark",
      });

      // Redirect to login page
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast("Logout failed. Please try again.", {
        type: "error",
        theme: "dark",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="hidden lg:flex lg:items-center gap-7 text-lg">
      <ToastContainer />
      {routes.map((route, id) => {
        const { Icon, href, title } = route;
        return (
          <div key={id}>
            <Link
              to={href}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all"
            >
              <Icon />
              {title}
            </Link>
          </div>
        );
    })}
    <Button onClick={handleLogout} variant="destructive">Logout</Button>
    </div>
  );
}

export default NavDesktop