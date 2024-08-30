const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const regg = require('../model/regmodel');
//const { where } = require('sequelize');


//idhu register kuhh...
router.post('/register',async (req,res)=>{
try{
    const emailiruku = await regg.findOne({where:{email:req.body.email}});
    if(emailiruku){
        return res.status(400).json("email already having");
    }

    const hash = await bcrypt.hash(req.body.password,10); 
    const user = new regg({
        username:req.body.username,
        email:req.body.email,
        password:hash,
        batch:req.body.batch,
        role:req.body.role,
        institution:req.body.institution,
        department:req.body.department,
        sinnumber:req.body.sinnumber,
        // password:req.body.password
   
    });
    //console.log(user);
    
    await user.save();
    return res.status(201).json({ message: "User registered successfully", user });
} 

catch(error){
    console.log(error.message);
    return res.status(400).json({message: "register error iruku !! ",error:error.message});
}});



//idhu login ku
router.post('/login',async (req,res)=>{
try {
    const userlog = await regg.findOne({where:{ email:req.body.email}});
    if(!userlog){
        return res.status(400).json("email not having ...so 1st register ");
    }


    const loginpass = await bcrypt.compare(req.body.password,userlog.password);
    if(!loginpass){
        return res.status(400).json("check password !!!!")
    }
    const token = jwt.sign({email:userlog.email},'ragasiyakey' , {expiresIn:'1h'})
    res.header('auth',token ).json({token});

} catch (error) {
    console.log(error.message,'error in login.......');
    return res.status(400).json({message:"there is a error :",error:error.message});
}
})

module.exports= router ;
//module.exports= data ;