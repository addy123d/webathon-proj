const express = require("express");
const router = express.Router();
const {
    redirectLogin
}= require("../middlewares/middleware");

const generateExpiry = require("../utils/generateExpiry");

// Import Mail function to send emails to user when their subscription gets expired automatically !
const sendMail = require("../utils/mail");

// Import Subscription model here !
const Subscription = require("../models/Subscription");
const User = require("../models/User");

//Import calculate function here !
const calculate = require("../utils/calculate");


// Create middleware function to delete old subscriptions
const deleteSubscription = (request,response,next)=>{
    const {ID} = request.session;

    Subscription.findOne({ userId : ID})
    .then((details)=>{

        if(details){
            const {expiryDate,price,date,durationSub,name} = details.plans;
            let indexValue = "";


            let today = new Date().toISOString().split("T")[0];

            for(var i = 0; i< price.length; i++){

                let expiry_date = new Date(expiryDate[i]);
                let now = new Date(); // Today's date
                console.log("Expiry Dates :",expiryDate[i] + "Today :",today);

                if(expiryDate[i] ===  today || expiry_date - now < 0){  //2nd condition is for past date
                    indexValue = i;
                    break;
                };
            };

            if(indexValue === ""){
                console.log("No subscription Deleted !");

                next();
            }else{

                // Delete values at indexValue place in respective Arrays
                expiryDate.splice(indexValue,1);
                date.splice(indexValue,1);
                price.splice(indexValue,1);
                durationSub.splice(indexValue,1);
                name.splice(indexValue,1);

                console.log("Expirydate :",expiryDate);
        
                Subscription.updateOne({
                    userId : ID
                },
                {
                $set : {
                    plans : {
                    name : name,
                    durationSub : durationSub,
                    date : date,
                    expiryDate : expiryDate,
                    price : price
                }
            } 
                }
                )
                .then(()=>{
                    console.log("Subscription Deleted !");

                    // Send email to user that his one of its subscription is expired !
                    User.findOne({ _id : ID})
                    .then((user)=>{
                        let condition = "delete";
                        sendMail(user.email,condition,(err)=>{
                            if(err){
                                response.json({
                                    "err" : "Mail not sent !❌"
                                });
                            }else{
                                console.log("Mail sent successfully !");
                                next();
                            }
                        })
                    })
                    .catch(err=>console.log(err));
                    // next();
                })
                .catch(err=>console.log("Error :",err));

            };

        }else{
            next();
        }
    })
    .catch(err=>console.log("Error : ",err));
};

//@type - GET
//@access - Private
//@route - /subscription/
router.get("/",redirectLogin,(request,response)=>{
    const {ID} = request.session;

    Subscription.findOne({ userId : ID})
    .then((details)=>{
        if(details){
            response.redirect("/subscription/add");
        }else{
            response.render("subscription");
        };
    })
    .catch(err=>console.log("Error :",err));
});

//@type - POST
//@access - Private
//@route - /subscription/
router.post("/",(request,response)=>{

    const { money, duration, ottname, ottdate, ottduration, ottprice} = request.body;
    const {ID} = request.session;

    // For generating expiry dates from durations and dates of respective subscription !
    const ottexpiry = generateExpiry(ottdate,ottduration);

    const details = {
        userId : ID,
        price : money,
        duration : duration,
        plans : {
            name : ottname,
            durationSub : ottduration,
            date : ottdate,
            expiryDate : ottexpiry,
            price : ottprice
                }
    };
        
    new Subscription(details).save()
    .then(()=>{
        console.log("Subscription details saved !");
        response.json({
            "success" : "Details saved !"
        });
    })
    .catch(err=>console.log("Error :",err));
        
});

//@type - GET
//@access - Private
//@route - /subscription/

router.get("/add",redirectLogin,deleteSubscription,(request,response)=>{

    const {ID} = request.session;

    Subscription.findOne({ userId : ID})
    .then((details)=>{
        if(details){
            const result = calculate(details.plans,details.price,details.duration);

            // Mail section
            if(result === "Alert"){
                // Send email to user that his/her capacity exceeded !
                  User.findOne({ _id : ID})
                  .then((user)=>{
                      let condition = "capacity";
                      sendMail(user.email,condition,(err)=>{
                          if(err){
                              response.json({
                                  "err" : "Mail not sent !❌"
                              });
                          }else{
                              console.log("Mail sent successfully !");
                              next();
                          }
                      })
                  })
                  .catch(err=>console.log(err));
            }
            
            
            response.render("addsubscription",{
                condition : result
            });

        }else{
            //If user hasn't submitted its payment capacity according to duration, so redirect him/her to main subscription details page !
            response.redirect("/subscription");
        }
    })
    .catch(err=>console.log("Error :",err));
});

//@type - POST
//@desc - to update ott subscription
//@access - Private
//@route - /subscription/add
router.post("/add",(request,response)=>{

    const {ottname, ottdate, ottduration, ottprice} = request.body;
    const {ID} = request.session;

    // For generating expiry dates from durations and dates of respective subscription !
    const ottexpiry = generateExpiry(ottdate,ottduration);

            Subscription.updateOne(
                {
                    userId : ID
                },
                {
                    $push : {
                        'plans.name' : ottname,
                        'plans.durationSub' : ottduration,
                        'plans.date' : ottdate,
                        'plans.expiryDate' : ottexpiry,
                        'plans.price' : ottprice
                    }
                }
            )
            .then(()=>{
                console.log("OTT Added !");

                  // Send email to user to notify that subscription successfully added !
                  User.findOne({ _id : ID})
                  .then((user)=>{
                      let condition = "add";
                      sendMail(user.email,condition,(err)=>{
                          if(err){
                              response.json({
                                  "err" : "Mail not sent !❌"
                              });
                          }else{
                              console.log("Mail sent successfully !");
                              next();
                          }
                      })
                  })
                  .catch(err=>console.log(err));

            })
            .catch(err=>console.log("Error : ",err));
});


module.exports = router;