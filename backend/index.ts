import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import * as path from 'path';

import spinRoutes from './routes/spinRoutes';

dotenv.config();

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server launched on port ${port}`));
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free')));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err));

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Utiliser les routes séparées
app.use('/', spinRoutes);