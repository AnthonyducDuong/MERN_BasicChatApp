const nodemailer = require('nodemailer');
const token = require('../configs/token.js');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    // port: 465,
    // secure: true,
    auth: {
        user: 'aslanteam01.noreply@gmail.com',
        pass: '0989053642',
    }
});

const sendConfirmationEmail = user => {
    const tokenConfirm = token.generateConfirmToken(user.email);
    const url = `http://localhost:${process.env.PORT}/api/user/confirmation/${tokenConfirm}`;
    // let flag = false;

    transport.sendMail({
            from: 'aslanteam01.noreply@gmail.com',
            to: user.email,
            subject: 'Chat App Basic in Email Vertication Link',
            html: `<h1>Hello world!</h1><p>Link active: <a href=${url} >Chat App Basic</a></p>`
        })
        .then(() => {
            console.log('Email sent successfully');
            console.log(url);
        })
        .catch((err) => {
            console.log('Something wrong when sent email');
            console.log(err.message);
        });
};

module.exports = {
    sendConfirmationEmail
};