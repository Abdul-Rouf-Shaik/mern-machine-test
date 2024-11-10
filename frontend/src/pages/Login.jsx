import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          userName: data.username, // Map 'username' from form data to 'userName' expected by backend
          password: data.password,
        },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      if (response.status === 200) {
        // Store the entire user object in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        toast("Login successful", {
          type: "success",
          theme: "dark",
        });
  
        setTimeout(() => navigate("/dashboard"), 1000); // Delay to show toast
      } else {
        toast(`${response.data.message || "Invalid login credentials"}`, {
          type: "error",
          theme: "dark",
        });
      }
    } catch (error) {
      toast(
        `${error?.response?.data?.message || "Invalid login credentials"}`,
        {
          type: "error",
          theme: "dark",
        }
      );
    }
  };

  return (
    <>
      <div className="grid-background"></div>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10 ">
        <div>
          <h1 className="text-4xl text-white text-center font-bold">
            DealsDray
          </h1>
        </div>
        <div className="max-w-md w-full p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-white text-left mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-md outline-none placeholder-gray-200 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-left mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded-md outline-none placeholder-gray-200 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
