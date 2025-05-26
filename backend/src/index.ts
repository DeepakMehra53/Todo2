
import express from 'express';
import authRoutes from './routes/auth';
import cors from 'cors'

const app = express();
const port:number=Number(process.env.PORT) || 3000
app.use(express.json());
app.use('/', authRoutes);
app.use(cors())

app.listen(port,()=>{
    console.log(`The server is running on http://localhost:${port}`);
});


/**
 * import http from 'http';
 * const post:number= Number(process.env.PORT)||3000;
 * const host= "127.0.0.1";
 * http.createServer((req,res)=>{}).listen(port,host,()=>{
 * console.log(`i'm listenin this server on http://localhost:${port}`)
 * }
 */
