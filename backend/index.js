const express =  require('express')
const cors =  require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDB =  require('./config/db')
const router =  require('./routes/index')

const app =  express()


app.use(express.json({limit: '500mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser())

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials:true
}))
app.use("/api",router)


const port = 8080 || process.env.PORT

connectDB()










app.listen(port,()=>{
    console.log(`Server is Started http://localhost:${port}`);
})