const nodemailer = require('nodemailer')
module.exports =  ({ HTML, subject, email }) => {
    try{
    let mailTransport = {}
    let mailOptions = {}
    
    // if gmail is using as a transport service
    const smtpConfig = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    }

    mailTransport = nodemailer.createTransport(smtpConfig)
    mailOptions = {
        from: {
            name: process.env.EMAIL_SENDER_NAME,
            address: process.env.EMAIL_SENDER,
        },
        to: email,
    }

    mailOptions.subject = subject

    mailOptions.html = HTML
   
       
        mailTransport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("error is "+error);
               resolve(false); // or use rejcet(false) but then you will have to handle errors
            } 
           else {
               console.log('Email sent: ' + info.response);
               resolve(true);
            }
            return
           });
    
  
}catch(error){
    console.log(error,'error')
}
}