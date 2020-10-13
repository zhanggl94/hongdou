import express from 'express';
import signupRouter from './routes/signup';

const app = express();

app.use('/api',signupRouter);

app.listen(3001, () => {
    console.log('node server start at 3001.');
});