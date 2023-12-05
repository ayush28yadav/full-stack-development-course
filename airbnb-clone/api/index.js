const express= require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
require('dotenv').config()
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
  
 mongoose.connect(process.env.MONGO_URL);

const bcryptSalt =  bcrypt.genSaltSync(10);
const jwtsecret= 'abcd';


app.get('/test', (req, res) => {
    res.json({message:'test ok'});
});


app.post('/register', async(req,res) => {
    const{name, email, password} = req.body;
    try{
    const userdoc =  await User.create({
        name,
        email, 
        password: bcrypt.hashSync(password, bcryptSalt),
     })
     res.json(userdoc);
    } catch(e){
        res.status(422).json(e);
}

});

app.post('/login', async(req,res) => {
    const {email,password} = req.body;
   const userDoc =  await User.findOne({email});
   if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password);
     if(passOk){
        jwt.sign({email:userDoc.email, id:userDoc._id},jwtsecret, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json('pass ok');
        });
       
     }else{
        res.json('pass not ok')
     }
   
   }else{
    res.status(422).json('not found');
   }
})


app.listen(4000);