import express from 'express';
import mainRouter from './routes/index'; // Adjust the path if necessary
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));
console.log(__dirname);
const PORT = 3000;

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || origin === 'http://localhost:5173' || origin === 'https://localhost:5173') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(cookieParser());

// Use the main router with the correct prefix
app.use('/api/v1', mainRouter);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

