import express from 'express';

const router = express.Router();

router.get('/carbill/search',(req,res)=>{
    console.log('search car bill.')
    res.send('search carbill');
})

export default router;