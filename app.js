const express = require('express');
const User = require('./user');

const app = express();

app.use(express.json());

app.get('/users', async(req,res)=> {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});