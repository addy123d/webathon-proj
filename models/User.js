const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    email : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
      }
});

module.exports = User = mongoose.model("user",userSchema);