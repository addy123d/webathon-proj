const mongoose = require("mongoose");
const schema = mongoose.Schema;

const subscriptionSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    price : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
   plans : 
   {
        name : {
            type: Array,
            required: true
        },
        durationSub : {
            type: Array,
            required: true
        },
        date : {
            type: Array,
            required: true
        },
        expiryDate : {
            type: Array,
            required: true
        }
        ,
        price : {
            type: Array,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
      }

});

module.exports = Subscription = mongoose.model("subscription",subscriptionSchema);