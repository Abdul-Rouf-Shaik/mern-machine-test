import React from "react";
import { routes } from "./routes";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { Button } from "./ui/button";
import axios from "../http";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useClickAway(ref, () => setOpen(false));

  const handleLogout = async () => {
    try {
      // Send request to backend to clear the auth cookie
      await axios.post("/api/auth/logout/", {}, { withCredentials: true });

      // Clear user data from localStorage
      localStorage.removeItem("user");

      // Show a success message
      toast("Logged out successfully", {
        type: "success",
        theme: "dark",
      });

      // Redirect to login page
      setTimeout(() => navigate("/"), 1000)
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
    <div ref={ref} className="lg:hidden ">
      <ToastContainer />
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed z-10 left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20"
          >
            <div className="grid gap-2">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
                  >
                    <Link
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                      }
                      to={route.href}
                    >
                      <span className="flex gap-1 text-lg">{route.title}</span>
                      <Icon className="text-xl" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + 3 / 10,
                }}
                className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700"
              >
                <Button
                  onClick={handleLogout}
                  className="w-full"
                  variant="destructive"
                >
                  Logout
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;
