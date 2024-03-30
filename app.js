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

app.get('/users/:id', getUser, (req, res)=> {
    res.json(res.user);
});

app.post('/users/:id', async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})


// Update user

app.patch('/users/:id', getUser, async (req, res) => {

    if (req.body.name != null) {             
        res.user.name = req.body.name;
    
    }
    
    if (req.body.email != null) {           
         res.user.email = req.body.email;
    }
    
    if (req.body.password != null) {         
        res.user.password = req.body.password;
    
    }
    
    try {const updatedUser = await res.user.save();
        res.json(updatedUser);
    
    } catch (err) {res.json(updatedUser);
    
    } res.status(400).json({ message: err.message });
    
    });
    