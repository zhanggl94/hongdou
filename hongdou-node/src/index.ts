import express from 'express';
import bodyParser from 'body-parser';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', signupRouter);
app.use('/api', signinRouter);

app.listen(3001, () => {
    console.log('node server start at 3001.');
});