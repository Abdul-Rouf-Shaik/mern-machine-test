import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORGIN,
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import adminRouter from "./routes/admin.routes.js"; 
import employeeRouter from "./routes/employee.routes.js"; 

//routes declaration
app.get("/", (_, res) => res.send("Hello, I am root."));
app.use('/api/auth', adminRouter);
app.use('/api/employees', employeeRouter);


export { app }