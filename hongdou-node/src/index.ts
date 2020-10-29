import express from 'express';
import bodyParser from 'body-parser';
import auth from './routes/auth';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';
import carBillRouter from './routes/carBill';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(auth);
app.use('/api', signupRouter);
app.use('/api', signinRouter);
app.use('/api/carbill', carBillRouter)

app.listen(3001, () => {
    console.log('node server start at 3001.');
});