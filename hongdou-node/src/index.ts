import express from 'express';
import signupRouter from './routes/signup';

const app = express();

app.use(signupRouter);

app.listen(3030, () => {
    console.log('node server start at 3030.');
});