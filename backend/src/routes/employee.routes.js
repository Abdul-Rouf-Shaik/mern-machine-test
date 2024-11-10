import express from "express";
import {Router} from "express";
import { addEmployee, getEmployees, updateEmployee, deleteEmployee, searchEmployees } from "../controllers/employee.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.put('/', upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), addEmployee);
router.get('/', getEmployees);
router.put('/:id', upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]), updateEmployee);
router.delete('/:id', deleteEmployee);

router.get('/search', searchEmployees);

export default router;