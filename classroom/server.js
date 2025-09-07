const express=require("express");
const app=express();
const session = require('express-session');
const flash=require('connect-flash');
const path=require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionoptions={
    secret:"mysupersecretstring", 
    resave:false ,
    saveUninitialized:true,
};
app.use(session(sessionoptions));
app.use(flash());

app.get("/requestcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1
    }
     res.send(`you send a request ${req.session.count} time`);
    });
app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query;
    req.session.name=name;

    if(name==="anonymnous"){
    req.flash("error","user not registered");
    }
    else{
    req.flash("success","user registered successfully");
    
    }
    res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
    res.locals.successMSG=req.flash("success");
    res.locals.errorMSG=req.flash("success");

    res.render("page.ejs",{ name: req.session.name});
});
app.listen(2000,()=>{
    console.log("server is working bro");
});