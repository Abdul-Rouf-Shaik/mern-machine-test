import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { BarLoader } from "react-spinners";
import { FaSearch } from "react-icons/fa";
import { Heading1 } from "lucide-react";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeMobile, setEmployeeMobile] = useState("");
  const [employeeDesignation, setEmployeeDesignation] = useState("");
  const [employeeGender, setEmployeeGender] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");
  const [employeeCourse, setEmployeeCourse] = useState("");
  const [newImageFile, setNewImageFile] = useState(null); // For new image upload

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employeeList);


  const [errors, setErrors] = useState({
    name: "",
    email: "",
    image: "",
    course: "",
    gender: "",
    designation: "",
    mobile: "",
  });

  const getEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/employees/");
      if (response.status === 200) {
        setEmployeeList(response.data.data);
      } else {
        toast("No employee exists", {
          type: "error",
          theme: "dark",
        });
      }
    } catch (error) {
      toast(
        `${error?.response?.data?.message || "Error while fetching employees"}`,
        {
          type: "error",
          theme: "dark",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };



  const handleEdit = (employeeId) => {
    const employeeToEdit = employeeList.find((emp) => emp._id === employeeId);

    setCurrentEmployee(employeeToEdit);
    setEmployeeName(employeeToEdit.name);
    setEmployeeMobile(employeeToEdit.mobile);
    setEmployeeDesignation(employeeToEdit.designation);
    setEmployeeGender(employeeToEdit.gender);
    setEmployeeEmail(employeeToEdit.email);
    setEmployeeImage(employeeToEdit.image);
    setEmployeeCourse(employeeToEdit.course);

    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentEmployee(null);
    setNewImageFile(null);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      image: "",
      course: "",
      gender: "",
      designation: "",
      mobile: "",
    };

    if (!employeeName) {
      newErrors.name = "Name is required.";
    }
    if (!employeeEmail) {
      newErrors.email = "Email is required.";
    }
    if (!employeeCourse) {
      newErrors.course = "Course is required.";
    }
    if (!employeeGender) {
      newErrors.gender = "Gender is required.";
    }
    if (!employeeDesignation) {
      newErrors.designation = "Designation is required.";
    }
    if (!employeeMobile) {
      newErrors.mobile = "Mobile is required.";
    }

    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.course &&
      !newErrors.gender &&
      !newErrors.designation &&
      !newErrors.mobile
    );
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", employeeName);
    formData.append("email", employeeEmail);
    formData.append("course", employeeCourse);
    formData.append("gender", employeeGender);
    formData.append("designation", employeeDesignation);
    formData.append("mobile", employeeMobile);

    // If a new image file is selected, upload it
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    try {
      setIsSaving(true);
      const response = await axios.put(
        `http://localhost:8000/api/employees/${currentEmployee._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast("Employee updated successfully!", {
          type: "success",
          theme: "dark",
        });
        setEmployeeList((prevList) =>
          prevList.map((emp) =>
            emp._id === currentEmployee._id
              ? { ...emp, ...response.data.data }
              : emp
          )
        );
        handleCloseDialog();
      }
    } catch (error) {
      toast(
        `${error?.response?.data?.message || "Error while saving changes"}`,
        {
          type: "error",
          theme: "dark",
        }
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(`/api/employees/${employeeId}`);
      if (response.status === 200) {
        toast("Employee deleted successfully!", {
          theme: "dark",
          type: "success",
        });
        setEmployeeList((prevList) =>
          prevList.filter((emp) => emp._id !== employeeId)
        );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast(error.response.data.message, { theme: "dark", type: "error" });
      } else {
        toast("An unexpected error occurred.", {
          theme: "dark",
          type: "error",
        });
      }
    }
  };



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fliterEmployees = () => {
    if (searchTerm === "") {
      setFilteredEmployees(employeeList); // Reset to all employees when search is cleared
    } else {
      setFilteredEmployees(
        employeeList.filter((employee) =>
          ["name", "email", "gender", "mobile"].some((key) =>
            employee[key].toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  
  }

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    fliterEmployees();
  }, [searchTerm, employeeList]);
 

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            {isSaving && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Make changes to employee here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="col-span-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm col-span-4">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Current Image
              </Label>
              <img
                src={
                  newImageFile
                    ? URL.createObjectURL(newImageFile)
                    : employeeImage
                }
                alt="Current"
                className="col-span-3 w-16 h-16 rounded-full"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newImage" className="text-right">
                Upload New Image
              </Label>
              <Input
                id="newImage"
                type="file"
                onChange={(e) => setNewImageFile(e.target.files[0])}
                className="col-span-3"
              />
            </div>

            {/* Other Fields */}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Input
                id="gender"
                value={employeeGender}
                onChange={(e) => setEmployeeGender(e.target.value)}
                className="col-span-3"
              />
              {errors.username && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course
              </Label>
              <Input
                id="course"
                value={employeeCourse}
                onChange={(e) => setEmployeeCourse(e.target.value)}
                className="col-span-3"
              />
              {errors.username && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.course}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input
                id="designation"
                value={employeeDesignation}
                onChange={(e) => setEmployeeDesignation(e.target.value)}
                className="col-span-3"
              />
              {errors.username && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.designation}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="col-span-3"
              />
              {errors.username && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mobile" className="text-right">
                Mobile
              </Label>
              <Input
                id="mobile"
                value={employeeMobile}
                onChange={(e) => setEmployeeMobile(e.target.value)}
                className="col-span-3"
              />
              {errors.username && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.mobile}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* main content */}
      <div className="p-6 text-white min-h-screen">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-center mb-8">Employee List</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search employees..."
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 right-5" />
          </div>
        </div>

        {isLoading ? (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEmployees.length === 0 ? (<h1 className="text-2xl mt-5 text-center text-red-600">
              No Employee exists with the searched value!!
            </h1>) : (filteredEmployees.map((employee) => (
              <motion.div
                key={employee._id}
                className="bg-gray-900 rounded-lg p-4 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold">{employee.name}</h2>
                    <p className="text-sm text-gray-400">
                      Gender: {employee.gender}
                    </p>
                    <p className="text-sm text-gray-400">
                      Designation: {employee.designation}
                    </p>
                    <p className="text-sm text-gray-400">
                      Email: {employee.email}
                    </p>
                    <p className="text-sm text-gray-400">
                      Mobile: {employee.mobile}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            )))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeList;
