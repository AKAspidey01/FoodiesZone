const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
// require("dotenv").config({ path: ".env" });

const sendmail = (options) =>
new Promise((resolve,reject)=>{
    
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:true,
        service:'Gmail',
        authentication: false,
        auth:{
            user:"checking.testing75@gmail.com",
            pass:"poslgctlxwktsiha"
        },
    });
    // const text = htmlToText.fromString(options.html,{
    //     wordwrap:130
    // });
    const mailOptions = {
        from:"manoj.vinutnaa@gmail.com",
        to: options.email,
        subject: options.subject,
        // text,
        html: options.html,
    };
    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            return reject (error);
        }
        console.log("Message id",info.messageId)
        console.log("Preview URL",nodemailer.getTestMessageUrl(info));
        return resolve({message:'reset email has sent to your inbox'});
    });
});

module.exports = sendmail;