import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.log('Error:', err);
});

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: '*'}));



import mainRouter from './routes/main.js';
app.use('/', mainRouter);


const httpServer = http.createServer(app);
import {ConnectToSocket} from './controllers/socketManager.js';
const io = ConnectToSocket(httpServer);

const db = mongoose.connection;
db.once("open", () => {
  //crud operations
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});