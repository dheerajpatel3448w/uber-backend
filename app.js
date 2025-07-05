import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectdb } from './db/connection.js';
import router from './routes/user.route.js';
import router2 from './routes/captain.route.js';
import router3 from './routes/map.router.js';
import router4 from './routes/ride.route.js';

const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent with requests
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
    ));
    app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use(cookieParser());

app.use("/api/v1/user",router);
app.use("/api/v1/captain",router2);
app.use("/api/v1/map",router3);
app.use("/api/v1/ride",router4);

export default app;

