import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoutes.js'
import crudRoutes from './routes/crudRoutes.js'
import filterRoutes from './routes/filterRoutes.js'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import favouriteRoutes from './routes/favouritesRoutes.js';
import recommendRoutes from './routes/recommendRoutes.js';

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded())

app.use('/api/auth', userRoutes);  
app.use('/api/property', crudRoutes);
app.use('/api/filter', filterRoutes)
app.use('/api/favourites', favouriteRoutes);
app.use('/api/recommendations', recommendRoutes);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(process.env.JWT_SECRET);
    console.log(`Server is running on PORT ${PORT}`);
})