const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",(req,res)=>{
    res.render("listings/user/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{

    let {username,email,password}=req.body;
    console.log(req.body);
    const newUser=new User({username,email,password});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);

    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","welcome to wanderapp");
    res.redirect("/listings");


    });

    
   }catch(e){
    req.flash("error",e.message);
    res.redirect("/listings");

    };


}));

    router.get("/login",(req,res)=>{
    res.render("listings/user/login.ejs");



    });

    router.post("/login",
        saveRedirectUrl,
        passport.authenticate("local", 
            { failureRedirect: "/login" ,failureFlash:true}),
            async(req,res)=>{
                req.flash("success","Welcome back to wanderapp,You have successfully logged in");
                let redirectUrl=res.locals.redirectUrl || "/listings";
                res.redirect(redirectUrl);

    });


    router.get("/logout",(req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","you are logged out from the system");
            res.redirect("/listings");

        });
    });


module.exports=router;