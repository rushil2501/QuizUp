// import pkg from 'express';
import  express  from "express"
import morgan from "morgan"
import cors from 'cors'
import { config } from "dotenv"
import router from "./router/route.js"
import connect from "./database/conn.js"


const app = express()

app.use(morgan('tiny'));
app.use(cors(
<<<<<<< HEAD
    
=======
    {
        origin: ["https://quiz-up-dep.vercel.app/"],
        methods: ["POST","GET"],
        credentials: true
    }
>>>>>>> 8271db416a27ba9460ad1ec6ca2ff63a1b751c39
))
app.use(express.json())
config();

// connect();

const port = process.env.PORT || 8080;

app.use('/api',router)

app.get('/',(req,res)=>{
    try{
        res.json("Get Request")
    }catch(error){
        res.json(error)
    }
})

connect().then(()=> {
    try {
        app.listen(port, ()=>{
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server")
    }
}).catch(error => {
    console.log("Invalid Database Connection")
})

