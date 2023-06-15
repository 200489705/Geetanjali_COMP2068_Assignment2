let mongoose = require( 'mongoose' );

var jobInfoSchema = new mongoose.Schema({ 
    title : {type : String },
    description : {type : String },
    skills : {type : String },
    experience : {type : String },
    pay : {type : String },
    location : {type : String },
    company_name : {type : String },
    posted_by : {type : String }
})

var jobAppliedSchema = new mongoose.Schema({ 
    job_title : {type : String, required : true, unique : true},
    email : {type : String, required : true},
    job_info : jobInfoSchema,
})

module.exports = mongoose.model('Applied', jobAppliedSchema);