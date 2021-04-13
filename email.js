var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashwinkachu07@gmail.com',
      pass: 'ASHWINachu#07'
    }
  });
  a='12312313'
  var mailOptions = {
    from: 'ashwinkachu07@gmail.com',
    to: 'ashwink@pesu.pes.edu',
    subject: 'Congrats for Registering on Our Gaming',
    text: a
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });