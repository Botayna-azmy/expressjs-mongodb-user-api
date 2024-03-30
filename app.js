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
    async function getUser(req, res, next) {
        try {
          // Retrieve user by ID using a robust validation and error handling approach
          const userId = req.params.id; // Extract user ID from request parameters
      
          // Validate user ID (consider adding custom validation logic if needed)
          if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }
      
          const user = await User.findById(userId);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Attach user data to response object for downstream access
          res.user = user;
          next();
        } catch (error) {
          console.error(error); // Log the error for debugging purposes
          return res.status(500).json({ message: 'Internal server error' });
        }
      }
      
      // Function to validate ObjectID format (assuming Mongoose usage)
      function isValidObjectId(id) {
        return mongoose.Types.ObjectId.isValid(id);
      }
      
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

    // Delete user

    app.delete('users/:id', grtUser, async(req, res)=>{
        try{
            await res.user.remove();
            res.json({message: 'User Deleted'});
        }catch(err){
            res.status(500).json({message: err.message});
        }
    });


    