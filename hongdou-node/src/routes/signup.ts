import express from 'express';

const router = express.Router();

router.post('/signup',(req,res)=>{
    res.send('signup1')
})

export default router;