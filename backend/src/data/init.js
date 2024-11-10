import mongoose from 'mongoose';
import { Employee } from "../models/employee.model.js";
import dotenv from "dotenv";

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("Error connecting to MongoDB Atlas", err);
});


const employeesData = [
  {
    name: "Adam",
    email: "adam@gmail.com",
    mobile: "1234567890",
    designation: "Manager",
    gender: "Male",
    course: "MA/BSC"
  },
  {
    name: "Emma",
    email: "emma@gmail.com",
    mobile: "1234567891",
    designation: "Assistant Manager",
    gender: "Female",
    course: "MBA"
  },
  {
    name: "John",
    email: "john@gmail.com",
    mobile: "1234567892",
    designation: "Senior Developer",
    gender: "Male",
    course: "B.Tech/Computer Science"
  },
  {
    name: "Olivia",
    email: "olivia@gmail.com",
    mobile: "1234567893",
    designation: "HR Specialist",
    gender: "Female",
    course: "BA/Human Resources"
  },
  {
    name: "Michael",
    email: "michael@gmail.com",
    mobile: "1234567894",
    designation: "Data Analyst",
    gender: "Male",
    course: "B.Sc/Statistics"
  },
  {
    name: "Sophia",
    email: "sophia@gmail.com",
    mobile: "1234567895",
    designation: "Marketing Manager",
    gender: "Female",
    course: "MBA/Marketing"
  },
  {
    name: "Daniel",
    email: "daniel@gmail.com",
    mobile: "1234567896",
    designation: "Project Coordinator",
    gender: "Male",
    course: "BA/Project Management"
  },
  {
    name: "Ava",
    email: "ava@gmail.com",
    mobile: "1234567897",
    designation: "Content Writer",
    gender: "Female",
    course: "MA/English"
  },
  {
    name: "James",
    email: "james@gmail.com",
    mobile: "1234567898",
    designation: "Financial Analyst",
    gender: "Male",
    course: "B.Com/Finance"
  },
  {
    name: "Isabella",
    email: "isabella@gmail.com",
    mobile: "1234567899",
    designation: "UI/UX Designer",
    gender: "Female",
    course: "B.Des/Design"
  }
];

Employee.insertMany(employeesData)
  .then((docs) => {
    console.log("Data inserted successfully:", docs);
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
  });
