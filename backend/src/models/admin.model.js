import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        image: {type: String, required: true, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dadmin%2Bicon&psig=AOvVaw0MFV4qCuA57BUZQe5EOjF5&ust=1731161803387000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJiCv8H2zIkDFQAAAAAdAAAAABAE"},
        userName: { type: String, required: true },
        password: { type: String, required: true },
    },
    {timestamps: true}
);

export const Admin = mongoose.model('Admin', adminSchema);
