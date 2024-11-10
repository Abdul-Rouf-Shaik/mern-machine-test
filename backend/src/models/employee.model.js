import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  image: { type: String, default: "https://res.cloudinary.com/dbe2deixc/image/upload/v1731075098/mern-machine-test/haidbeov2x6q1lxgfgqg.png" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  createdate: { type: Date, default: Date.now },
}, {timestamps: true});

export const Employee = mongoose.model('Employee', employeeSchema);
