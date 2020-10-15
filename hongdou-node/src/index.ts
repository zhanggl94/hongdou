import express from 'express';
import bodyParser from 'body-parser';
import signupRouter from './routes/signup';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', signupRouter);

app.listen(3001, () => {
    console.log('node server start at 3001.');
});