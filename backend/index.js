import express from 'express'
const app = express();
import "dotenv/config"
const PORT = process.env.PORT || 8080

import bodyParser from 'body-parser'; //to accept for data on server
import { connectDB } from './Models/db.js';
import router from './Routes/Momentroutes.js';  

connectDB()

app.use('/api/memories',router);
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("memories.in is running")
})


