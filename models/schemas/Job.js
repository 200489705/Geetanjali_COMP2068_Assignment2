let mongoose = require( 'mongoose' );

var jobSchema = new mongoose.Schema({ 
    title : {type : String, required: true, unique: true},
    description : {type : String, required : true},
    skills : {type : String, required : true},
    experience : {type : String, required : true},
    pay : {type : String },
    location : {type : String, required : true},
    company_name : {type : String, required : true},
    posted_by : {type : String, required : true}
});


module.exports = mongoose.model('Job', jobSchema);