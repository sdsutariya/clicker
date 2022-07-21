import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import connectdb from './db/connectdb.js'
import helmet from 'helmet';
import morgan from 'morgan';
const port = process.env.PORT || 3002
const DATABASE_URL = process.env.DATABASE_URL

//database connection
connectdb(DATABASE_URL);


app.listen(port,()=>{
    console.log(`server listening on http://localhost:${port}`)
})