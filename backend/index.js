import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import routes from './routes/index.js';

dotenv.config()

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'))

//db connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected successfull'))
    .catch((error) => console.log('Failed to connect to DB', err));


app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.status(200).json({
        'hii': 'buy'
    })
});

app.use('/api/v1', routes);

//error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong' });
});


//not found middleware
app.use((req, res) => {
    res.status(404).json({
        nessage: 'Not found'
    })
})

app.listen(PORT, () => {
    console.log('Server starts listening on port: ' + PORT)
})