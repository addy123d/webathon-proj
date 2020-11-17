const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD

    }
});
const sendMail = (email,condition) => {
    let mailOptions;
    if(condition === "delete"){
        mailOptions = {
            to: email, // This is to be allowed by GMAIL
            from: "OTT Management Platform",
            subject: "OTT Subscription Expired",
            text: `One of your subscription got expired ! Check if you can add subscription <a href="www.google.com">Check</a>`
        };
    }else{
        if(condition === "capacity"){
            mailOptions = {
                to: email, // This is to be allowed by GMAIL
                from: "OTT Management Platform",
                subject: "OTT Paying Limit Reached !",
                text: `Your Paying Limit Reached ! Check <a href="www.google.com">Check</a>`
            };
        }else{
            mailOptions = {
                to: email, // This is to be allowed by GMAIL
                from: "OTT Management Platform",
                subject: "OTT Subscription Added Succesfully !✅",
                text: `Subscription Added ! Check if your status <a href="www.google.com">Check</a>`
            }; 
        }
 
    }



    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error from nodemailer or gmail might be !", err)
            cb(err, null);
        } else {
            console.log("Success ! Mail has been sent successfully from nodemailer !");
            cb(null, data);
        }
    });
};

module.exports = sendMail;