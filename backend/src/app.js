import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: ["https://mern-machine-test-delta.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
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