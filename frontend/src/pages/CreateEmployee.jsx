import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !designation || !gender || !course) {
      toast("All fields are required", { theme: "dark", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course);
    if (image) formData.append("image", image);

    try {
        setIsLoading(true);
      const response = await axios.put(
        "/api/employees",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 201) {
        // Clear form fields after successful submission
        setName("");
        setEmail("");
        setMobile("");
        setDesignation("");
        setGender("");
        setCourse("");
        setImage(null);

        toast("Employee created successfully!", {
          theme: "dark",
          type: "success",
        });

        setTimeout(() => navigate("/employees"), 1000);
      } else {
        toast("Error creating the employee", { theme: "dark", type: "error" });
      }
    } catch (error) {
      toast(error.response?.data?.message || "Failed to create employee", {
        theme: "dark",
        type: "error",
      });
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-[#111827] bg-opacity-65  min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-lg bg-opacity-30 border border-gray-700">
          {isLoading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Create Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-white">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white">Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white">
                Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
                placeholder="Enter designation"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-white">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
                placeholder="Enter course"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 rounded bg-[#333] text-white outline-none"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-[#3b82f6] rounded text-white font-semibold hover:bg-[#2563eb] transition"
            >
              Create Employee
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
