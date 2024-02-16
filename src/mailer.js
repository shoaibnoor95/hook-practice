const nodemailer = require('nodemailer')
// const sgTransport = require('nodemailer-sendgrid-transport')
module.exports =  ({ HTML, subject, email }) => {
    try{
    let mailTransport = {}
    let mailOptions = {}
    console.log(process.env.SMTP_HOST,process.env.SMTP_PORT,process.env.SMTP_PASS)

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
    mailTransport.sendMail(mailOptions)
    console.log('here')
    return
}catch(error){
    console.log(error,'error')
}
}