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
var b = Math.floor((Math.random()*999999)+100000); 
var app=express() 
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ashwinkachu07@gmail.com',
      pass: 'ASHWINachu#07'
    }
  });   
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
app.get('/',function(req,res){ 
    res.set({ 
        'Access-control-Allow-Origin': '*'
        }); 
    return res.redirect('index.html'); 
    }).listen(4000) 
       
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
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
   // return res.redirect('firstpage.html'); 
   return res.redirect('otp.html')
})
app.post('/otp',function(req,res){
  var otp = req.body.otp;
  if (otp==b)
    return res.redirect('mainpage.html');
  else
    return res.redirect('ak.js');
})
app.post('/log_up',function(req,res){
    var nam = req.body.name;
    var pass = req.body.password;
    db.collection('details').findOne({name:nam,password:pass},function(err,reuslt){
      if (err) throw err;
      if(reuslt)
        return res.redirect('firstpage.html');
      else  
      {
        alert("User Not Found");
        return res.redirect("index.html");

      }
    })
    
}) 
app.post('/pong',function(req,res){
  return res.redirect("pong.html");
})
  
  

  
console.log("server listening at port 3000"); 