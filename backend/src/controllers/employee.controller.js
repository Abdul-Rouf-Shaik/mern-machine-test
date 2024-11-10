import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// Add a new employee
export const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  if (
    [name, email, mobile, designation, gender, course].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedEmployee = await Employee.findOne({
    email,
  });
  // console.log(req.files.image[0]);

  if (existedEmployee) {
    res
    .status(409)
    .json(new ApiResponse(409, {}, "Employee with email already exists"));
    
  }

  const imageLocalPath = req.files.image ? req.files.image[0].path : null;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(400, "Image file is required");
  }

  const employee = await Employee.create({
    image: image.url,
    name,
    email,
    mobile,
    designation,
    gender,
    course,
  });

  const createdEmployee = await Employee.findById(employee._id);

  if (!createdEmployee) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdEmployee, "Employee added Successfully"));
});

// Get all employees
export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res
    .status(200)
    .json(new ApiResponse(200, employees, "Employees retrieved successfully"));
});

// Update an employee by ID
export const updateEmployee = asyncHandler(async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  if (
    [name, email, mobile, designation, gender, course].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //getting employee details to change
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Employee not found"));
  }

  //getting the updated path of image
  const imageLocalPath = req.files?.image ? req.files.image[0].path : null;
  let updatedImage;

  // checking whether the employee image changed or not
  if (imageLocalPath) {
    //checking if user has uploaded image in otherthan "jpg", "png"
    const allowedFormats = [".jpg", ".png"]; // Allowed formats (jpg, png)
    const fileExtension = path.extname(imageLocalPath).toLowerCase(); // Get the file extension

    if (!allowedFormats.includes(fileExtension)) {
      res
        .status(400)
        .json(
          new ApiResponse(
            200,
            null,
            "Invalid file format. Only JPG and PNG are allowed."
          )
        );
    }

    // Check if there is an old avatar URL to delete
    if (employee.image) {
      // Extract the public_id of the old avatar from the URL
      const publicId =
        "mern-machine-test/" + employee.image.split("/").pop().split(".")[0];
      // Delete the old avatar from Cloudinary
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        throw new ApiError(
          500,
          "Error while deleting the old avatar from Cloudinary"
        );
      }
    }

    // Upload the new avatar to Cloudinary
    updatedImage = await uploadOnCloudinary(imageLocalPath);

    if (!updatedImage?.url) {
      throw new ApiError(400, "Error while uploading Image");
    }
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: updatedImage?.url || employee.image,
        name,
        email,
        mobile,
        designation,
        gender,
        course,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedEmployee,
        "Account details updated successfully"
      )
    );
});

// Delete an employee by ID
export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee)
    return res.status(404).json(new ApiResponse(404, {}, "Employee not found"));

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Employee deleted successfully"));
});


//search employee
export const searchEmployees = asyncHandler(async (req, res) => {
  const { query } = req.query; // Search term

  if (!query) {
    return res.status(400).json(new ApiResponse(400, {}, 'Query parameter is required'));
  }

  const searchRegex = new RegExp(query, 'i'); // Case-insensitive regex search

  // Search for employees in the fields: name, email, mobile, designation, gender, and course
  const employees = await Employee.find({
    $or: [
      { name: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
      { mobile: { $regex: searchRegex } },
      { designation: { $regex: searchRegex } },
      { gender: { $regex: searchRegex } },
      { course: { $regex: searchRegex } }
    ]
  });

  if (employees.length === 0) {
    return res.status(404).json(new ApiResponse(404, {}, 'No employees found'));
  }

  res.status(200).json(new ApiResponse(200, employees, 'Employees retrieved successfully'));
});