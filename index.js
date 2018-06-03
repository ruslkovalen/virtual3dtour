const express = require('express')
var geoip = require('geoip-lite');
var GeoIpModel = require('./Model/GeoIp');
var BusinessModel=require('./Model/Business');
var ApplicantModel = require('./Model/Applicant');
var VisitModel = require('./Model/Visit');
var cookieParser = require('cookie-parser');
const app = express();
const requestIp = require('request-ip');
var path    = require("path");
var db = require('./db/mongoose');
var cookie = require('cookie');
var _ = require('lodash')
var moment = require('moment')
const port = 3000;
const htmlColors = require('html-colors');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cookieParser());
app.use('/storinka1',function(res,req){

  
})
app.use(function(req,res,next){

  
  var options = {
    maxAge: 24 * 60 * 60 * 1000, // would expire after 1 day
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed     
}
  var visit = req.cookies['Visit'];
  if(visit===undefined){
 
   VisitModel.findOne({date:Date.now()})
   .then(function(visit) {
     if(visit){
 
       VisitModel.findOneAndUpdate({date:Date.now()},
         { count:visit.count+1},
         {upsert:false})
         .then(function(visit) {
             console.log(visit);
             var cook2 = cookie.serialize("Visit","true", {httpOnly: true, path: '/', signed: true});
            // res.cookie("Visit","true",options);
            res.header("Set-Cookie",cook2);
             next();
             
             
         })
     }  
     else{
       var newVisitModel = new VisitModel({date:Date.now(),count:1});
       newVisitModel.save().
     then(function(){
     
      var toDate = new Date();
      toDate.setDate(toDate.getDate());
 console. log("ok");
 var cook2 = cookie.serialize("Visit",toDate, {httpOnly: true, path: '/', signed: true});
            // res.cookie("Visit","true",options);
            res.header("Set-Cookie",cook2);
 //res.cookie("Visit","true",options);
 next();
 })
     }
 
   })
 
  }
  else{
   next();
  }
 
 


})
app.use(function(req,res,next){
  var options = {
    maxAge: 24 * 60 * 60 * 1000, // would expire after 1 day
    httpOnly: true, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed     
}
  var cookies = req.cookies['GeoIp'];

  



  if (cookies === undefined)
    {
      
    
var ip = requestIp.getClientIp(req);
//var ip ='212.1.118.18';
var geodata = geoip.lookup(ip);
  

GeoIpModel.findOne({name:geodata.city})
.then(function(geo) {

if(geo){

  GeoIpModel.findOneAndUpdate({name: geodata.city},
    { count:geo.count+1},
    {upsert:false})
    .then(function(quiz) {
        console.log(quiz);
        var cook2 = cookie.serialize("GeoIp",ip, {httpOnly: true, path: '/', signed: true});
            // res.cookie("Visit","true",options);
            res.header("Set-Cookie",cook2);
        //res.cookie("GeoIp",ip,options);
       
        next();
    })
}

if(!geo){

var newGeoIpModel = new GeoIpModel({name:geodata.city,count:1});
newGeoIpModel.save().
then(function(){

console.log("ok");
var cook2 = cookie.serialize("GeoIp",ip, {httpOnly: true, path: '/', signed: true});
            // res.cookie("Visit","true",options);
            res.header("Set-Cookie",cook2);
            next();

})
}
next();

})
// inside middleware handler

        
    }
    next();

})

app.get('/',function(req,res){
  if(req.cookies['GeoIp']===undefined){
  var cook2 = cookie.serialize("GeoIp","ip", {httpOnly: true, path: '/', signed: true});
  }
  // res.cookie("Visit","true",options);
  res.header("Set-Cookie",cook2);
    res.sendFile(path.join(__dirname+'/index.html'));
 

  
});

app.use('/getAdditionalPontsCathedral',function(req,res){

  var panoramid = req.query.panoramId;
  var panoramidAdditional = panoramid+"additional";
  var points = req.query.points;
  var cookies = req.cookies[panoramidAdditional];
  if(cookies===undefined){
  
    var options = {
      maxAge: 24 * 60 * 60 * 1000, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: false // Indicates if the cookie should be signed     
  }
  var visit = req.cookies['Visit'];
  var date = new Date(visit);

  
  BusinessModel.findOne({name:panoramid,date:date})
  .then(function(Business) {
  if(Business){
    BusinessModel.findOneAndUpdate({name:panoramid,visit},
      { value:Business.value+points},
      {upsert:false})
      .then(function(business) {
          console.log(business);
          res.cookie(panoramidAdditional,points,options);
          
      })
    }
    else{
      var newBusinessModel = new BusinessModel({name:panoramid,value:points,date:Date.now()});
  newBusinessModel.save().
then(function(){

console.log("ok");
res.cookie(panoramidAdditional,points,options);
    })
  }
  })


  }
})
app.use('/getApplicants',function(req,res){

  ApplicantModel.find({})
    .then(function(applicants){
      res.send(applicants);
        })   
      })

    app.post('/postApplicants',function (req,res) {
      
      var newApplicantModel = new ApplicantModel({FullName:req.body.FullName,Email:req.body.Email,Zno:req.body.Zno});
      newApplicantModel.save().
      then(function(applicant){
      res.send(applicant);
      })
    })

app.use('/UpdateBusinessValue',function(req,res){

  var visit = req.cookies['Visit'];
  var date = new Date(visit);


var panoramid = req.query.panoramId;
var points = req.query.points;
var cookies = req.cookies[panoramid];
if(cookies===undefined){

  var options = {
    maxAge: 24 * 60 * 60 * 1000, // would expire after 15 minutes
    httpOnly: false, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed     
}

 BusinessModel.findOne({name:panoramid,date:date})
 .then(function(Business) {
if(Business){

  BusinessModel.findOneAndUpdate({name:panoramid,date:date},
    { value:Business.value+points},
    {upsert:false})
    .then(function(business) {
        console.log(business);
        res.cookie(panoramid.toString(),points,options);
        res.send("")
    })
}
else{
  var newBusinessModel = new BusinessModel({name:panoramid,value:points,date:Date.now()});
  newBusinessModel.save().
then(function(){

console.log("ok");
res.cookie(panoramid.toString(),points,options);
res.send("")
})
}

 })


}

})
app.use('/knowMore',function(req,res){

  var visit = req.cookies['Visit'];
  var date = new Date(visit);
  var panoramid = req.query.panoramId;
  var points = 10;
  var cookies = req.cookies[panoramid+"more"];
  if(cookies===undefined){
  
    var options = {
      maxAge: 24 * 60 * 60 * 1000, // would expire after 15 minutes
      httpOnly: false, // The cookie only accessible by the web server
      signed: false // Indicates if the cookie should be signed     
  }
  
   BusinessModel.findOne({name:panoramid,date:date})
   .then(function(Business) {
  if(Business){
  
    BusinessModel.findOneAndUpdate({name:panoramid,date:date},
      { value:Business.value+points},
      {upsert:false})
      .then(function(business) {
          console.log(business);
          panoramid= panoramid+"more";
          res.cookie(panoramid.toString(),points,options);
          res.send("")
      })
  }
  else{
    var newBusinessModel = new BusinessModel({name:panoramid,value:points,date:Date.now()});
    newBusinessModel.save().
  then(function(){
  
  console.log("ok");
  panoramid= panoramid+"more";
  res.cookie(panoramid.toString(),points,options);
  res.send("")
  })
  }
  
   })
  
  
  }

  
})
app.use('/getVisitsPerMonth',function(req,res){

  var date =new Date();
  var fromDate = new Date();
  fromDate.setDate(fromDate.getMonth()-8);
  var toDate = new Date();
  toDate.setDate(toDate.getDate());

 
  VisitModel.aggregate([
    {$match:{date:{$gte:fromDate,$lt:toDate}}},
    {
      "$group": {
        _id : { month: { $month: "$date" }},
          totalVaulePerGroup: {
              $sum: "$count"
          },
          count: { $sum: 1 }
          
      
  }
}
]).then(function(resp){

    res.send(resp);
  })

})
app.use('/getRegions',function(req,resp){

  var respRegion = [];
  GeoIpModel.find({}).then(function(res){
var visitRegion = 0;
    if(res){

    for(var i = 0; i < res.length; i++){
        visitRegion+=res[i].count;
    }
    for(var b =0;b<res.length;b++){
      respRegion.push({name:res[b].name,avarage:Math.round((res[b].count/visitRegion)*100),color:htmlColors.hex(htmlColors.random())})
    }
  }
  resp.send(respRegion);
  })
})

app.use('/getInterestOfCatherdral',function(req,resp){

  var cathedralInterest = [];

  var namesofpanoramCathedral = ["pano52","pano50","pano53","pano57","pano59","pano60"];
BusinessModel.aggregate([
{$match: {name:{$in:namesofpanoramCathedral}}},

{
  "$group": {
    _id :"$name",
      totalVaulePerGroup: {
          $sum: "$value"
      },
      averageQuantity: { $avg: "$value" },
      count: { $sum: 1 }
      
      
  }
}

]).then(function(sss){

  if(sss){
  var totalvalue = 0;
for (var i = 0; i<sss.length; i++){

totalvalue+=sss[i].totalVaulePerGroup;

}
for (var b = 0; b<sss.length; b++){

  switch(sss[b]._id){

    case "pano52":sss[b]._id="кафедра технологій управління";
    break;
    case "pano50":sss[b]._id="Кафедра мережевих та інтернет технологій";
    break;
    case "pano53":sss[b]._id= "Кaфедра прикладних та інформаційних систем";
    break;
    case "pano57":sss[b]._id= "кафедра інтелектуальних та інформаційних систем";
    break;
    case "pano59":sss[b]._id = "кафедра програмних систем і технологій";
    break;
    case "pano60": sss[b]._id = "кафедра кібербезпеки та захисту інформації";
    break;
    default:break;
  }

  cathedralInterest.push({ name:sss[b]._id,avarage:Math.round((sss[b].totalVaulePerGroup/totalvalue)*100)});
  
  }
}
  resp.send(cathedralInterest);


})

})
//average point day week 13 days shown
app.use('/getPointsPerDate',function(req,res){

  var date =new Date();
  var fromDate = new Date();
  fromDate.setDate(fromDate.getDate()-13)
  var toDate = new Date();
  toDate.setDate(toDate.getDate());

  BusinessModel.aggregate([
   {$match:{date:{$gte:fromDate,$lt:toDate}}},

    {
        "$group": {
          _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
            totalVaulePerGroup: {
                $sum: "$value"
            },
            averageQuantity: { $avg: "$value" },
            count: { $sum: 1 }
            
        }
    }
  ]).then(function(resp){

      res.send(resp);
    })
      })
app.use(express.static(__dirname));


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})