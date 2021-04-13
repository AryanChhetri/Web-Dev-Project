var express=require("express"); 
var bodyParser=require("body-parser"); 
var nodemailer = require('nodemailer'); 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashwinkachu07@gmail.com',
      pass: 'ASHWINachu#07'
    }
  });  
var app=express() 
  
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
    var b = Math.floor((Math.random()*999999)+100000);
    const a="Secret Key Code is:" + b;
    var mailOptions = {
        from: 'ashwinkachu07@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: a
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
          
    return res.redirect('firstpage.html'); 
}) 
  
  
app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('firstpage.html'); 
}).listen(3000) 
  
  
console.log("server listening at port 3000"); 
