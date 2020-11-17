const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const {
    redirectLogin,
    redirectMain
}= require("./middlewares/middleware");

let app = express();

//Set view engine
app.set("view engine","ejs");

// Session configuration
const sess = {
    name: "User",
    resave: false,
    saveUninitialized: true,
    secret: "mySecret",
    cookie: {}
};


if (app.get('env') === "production") {
    sess.cookie.secure = false;
    sess.cookie.maxAge = 60 * 60;
    sess.cookie.sameSite = true;
};

app.use(session(sess));


//Bring Routes
const auth = require("./routes/auth");
const subscription = require("./routes/subscription");


// Database Setup
const url = require("./setup/config").url;

// Database connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
};

mongoose.connect(url,options)
.then(()=>{
    console.log("Database connected successfully !");
})
.catch(err=>console.log("Error :",err));


app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

// Routes
app.use("/",express.static(__dirname + "/client"));
app.use("/auth",auth);
app.use("/subscription",subscription);

//@type - GET
//@access - Private
//@route - /logout
app.get("/logout",redirectLogin,(request,response)=>{
    request.session.destroy(function(error){
        if(error){
            response.redirect("/subscription");
        }else{
            response.redirect("/");
        }
    })
});

module.exports = app;