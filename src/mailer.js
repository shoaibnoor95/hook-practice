const nodemailer = require('nodemailer')
module.exports =  ({ HTML, subject, email }) => {
    try{
    // let mailTransport = {}
    // let mailOptions = {}
    console.log('2',process.env.SMTP_HOST,process.env.SMTP_PORT,process.env.SMTP_USER,process.env.SMTP_PASS,process.env.EMAIL_SENDER,process.env.EMAIL_SENDER_NAME)
    // // // if gmail is using as a transport service
    // const smtpConfig = {
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     secure: true,
    //     auth: {
    //         user: process.env.SMTP_USER,
    //         pass: process.env.SMTP_PASS,
    //     },
    // }





  // send mail with defined transport object
//   let info =  transporter.sendMail({
//     from: '"Joe" example@brevo.com', // sender address
//     to: "hi@mail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations", // plain text body
//   });



    // mailTransport = nodemailer.createTransport(smtpConfig)
    // mailOptions = {
    //     from: {
    //         name: process.env.EMAIL_SENDER_NAME,
    //         address: process.env.EMAIL_SENDER,
    //     },
    //     to: email,
    // }

    // mailOptions.subject = subject

    // mailOptions.html = HTML
   
       
    //     mailTransport.sendMail(mailOptions, function(error, info){
    //         if (error) {
    //             console.log("error is "+error);
    //         } 
    //        else {
    //            console.log('Email sent: ' + info.response);
    //         }
    //         console.log('EEEEmail sent: ' );
             
    //         return
    //        });

    return new Promise((resolve,reject)=>{
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "shoaib.noor@systemsltd.com"              , // generated ethereal user
              pass: "xsmtpsib-3a96afc77b8c437a2a0ec5f121eef1b0103430b0fe8159531bf6c3ea99db469d-jrmtW5VZsFJTU7Qn", // generated ethereal password
            },
          });
        console.log(2.5)
       var mailOptions = {
        from: {
                    
            name: process.env.EMAIL_SENDER_NAME,
            address: process.env.EMAIL_SENDER,
                },
                to: email,
       };
       let resp=false;
       
       transporter.sendMail(mailOptions, function(error, info){
           if (error) {
               console.log("error is sssssssss"+error);
              resolve(false); // or use rejcet(false) but then you will have to handle errors
              console.log(3.5)
           }
      
          else {
              console.log('Email sent: ' + info.response);
             console.log(4.5)
              resolve(true);
           }
          });
        })  
    
  
}catch(error){
    console.log(error,'error')
}
}