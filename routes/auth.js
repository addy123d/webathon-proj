const express = require("express");
const router = express.Router();
const {
    redirectLogin,
    redirectMain
}= require("../middlewares/middleware");

// Import User model here !
const User = require("../models/User");

//@type - GET
//@access - Public
//@route - /auth/
router.get("/",redirectMain,(request,response)=>{
    response.render("auth");
});

//@type - POST
//@access - Public
//@route - /auth/register
router.post("/register",(request,response)=>{
    //Collect all details
    const {email,password,contact} = request.body;

    User.findOne({email : email})
    .then((user)=>{
        // Check if user exists or not !
        if(user)
            response.status(404).json({
                "errmsg" : "Email ID is already registered !"
            });
        else{

            // Create user object
            let user = {
                email : email,
                password : password,
                contact :  contact
            };

            //Finally save it into database

            new User(user).save()
            .then((user)=>{
                console.log("User registered successfully !");

                // Store email
                request.session.Email = user.email;
                request.session.ID = user._id;

                console.log("Session :",request.session);

                // Success Response
                response.status(200).redirect("/subscription");
                // response.status(200).json({
                //     "message" : "Successfully Registered !✔"
                // })
            })
            .catch(err=>console.log("Error :",err));
            
        }
    })
    .catch(err=>console.log("Error :",err));
    
});

//@type - POST
//@access - Public
//@route - /auth/login
router.post("/login",(request,response)=>{
    const { email, password } = request.body;

    User.findOne({ email : email })
    .then((user)=>{
        console.log(user);
        // Check whether user is registered or not !
        if(user){

            // Password Matching
            if(user.password === password){

                // Store email
                request.session.Email = user.email;
                request.session.ID = user._id;

                response.json({
                    "success" : "Login Successful !✅"
                });
            }else{
                response.json({
                    "failure" : "Password not matched !"
                });
            };

        }else{
            response.json({
                "emailerror" : "Email ID is not registered !"
            });
        };
    })
    .catch(err=>console.log("Error :",err));
});

module.exports = router;