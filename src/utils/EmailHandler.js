import mailer from "nodemailer"


export function SendMail(item) {
    
    console.log(item)
    let mailtranspoter = mailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.Auth_mail,
            pass: process.env.Auth_pass,
        }
    })

    let mailDetail = {
        from: process.env.Auth_mail,
        to: item?.email,
        subject: item?.Sub,
        text: item?.text
    };
    mailtranspoter.sendMail(mailDetail, function (err, data) {
        if (err) console.log(err.message)
    })
}