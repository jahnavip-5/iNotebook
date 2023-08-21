const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');


const JWT_SECRET="harryisagoodboy";

//ROUTE 1:create a user using: POST "/api/auth/createuser"  . Doesn't require authentcation
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must contain atleast 5 characters').isLength({min:5})
], async (req,res)=>{
    let success=false;

    // Return Bad request and errors in case of errors
    // Extracts errors from a request
    const errors=validationResult(req);
    // If there are errors then return 400 error status
    if(!errors.isEmpty()){
        return res.status(400).json({success,error:errors.array()});
    }

try{

        // Check whether the user with similar email exists
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }
 
        // To generate salt
        const salt=await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);
            // create a new user
            user=await User.create({
                name:req.body.name,
                password:secPass,
                email:req.body.email,
            });

            const data={
                user:{
                    id:user.id
                }
            }

            const authtoken=jwt.sign(data,JWT_SECRET);
           
            // .then(user=>res.json(user))
            // .catch(err=>{console.log(err)
            // res.json({error:"Please enter a unique value for email",message: err.message})});

            // obj={
            //     a:'thios',
            //     number:34
            // }
            // res.json(obj)
            // console.log(req.body);
            // const user=User(req.body);
            // user.save();

            // res.json(user)
            success=true;
            res.json({success,authtoken})
}catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error!")
}

})


//ROUTE 2:Authenticate a user using: POST "/api/auth/login"  . Doesn't require authentcation

router.post('/login',[
    // If the email is not valid then don't allow
    body('email','Enter a valid Email').isEmail(),
    // If the password is empty then don't allow
    body('password','Password cannot be empty').exists()
], async (req,res)=>{
    let success=false;

        // Return Bad request and errors in case of errors
        // Extracts errors from a request
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
        }

        // Take email and password from body
        const {email,password}=req.body;
        try {
            
            // fetch email from User schema
            let user=await User.findOne({email});
            // Throw error if email doesn't exist in db
            if(!user){
                return res.status(400).json({success,error:"Please enter correct credentials"})
            }


            // Compare the password given by the user and the actual password
            const passwordcompare=await bcrypt.compare(password,user.password);
//                                                  ^             ^
//                                           passwordstring     hashed password in db
//           If the password doesn't match, throw error
            if(!passwordcompare){
                return res.status(400).json({success,error:"Please enter correct credentials"})
                
            }

            // If the password is valid, send user data
            const data={
                user:{
                    id:user.id
                }
            }

            const authtoken=jwt.sign(data,JWT_SECRET);
           success=true;
            res.json({success,authtoken})

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error!")
        }
})



//ROUTE 3: Logged in user details using: POST "/api/auth/getuser"  .Requires authentcation
router.post('/getuser',fetchuser, async (req,res)=>{


            try {
                let userId=req.user.id;
                // Fetch user ID which is present in token except password
                const user=await User.findById(userId).select("-password")
                res.send(user)
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal server error!")
            }


});

module.exports=router