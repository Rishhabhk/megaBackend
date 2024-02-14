const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
})


//send mail
async function sendVerificationMail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification email from StudyNotion", otp);
        console.log("email sent successfully",mailResponse);
    }
    catch(e){
        console.log("error while sending mail", e);
    }
}


otpSchema.pre("save", async function(next) {
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema)