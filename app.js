import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectdb } from './db/connection.js';
import router from './routes/user.route.js';
const app = express();
app.use(cors(
    ));
    app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use(cookieParser());

app.use("/api/v1/user",router);
connectdb().then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
}).catch((err) => {
    console.error('Database connection failed:', err);
});

