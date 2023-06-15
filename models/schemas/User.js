let mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({ 
    email : {type : String, required: true},
    password : {type : String, required : true},
    registerAs : {type : String, required : true},
    full_name : {type : String},
    dob : {type : String},
    phone_number : {type : String},
    highest_degree : {type : String}
});


module.exports = mongoose.model('User', userSchema);