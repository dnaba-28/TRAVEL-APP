if(process.env.NODE_env != "production"){
require('dotenv').config();

};

console.log(process.env.SECRET) ;

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const engine=require("ejs-mate");
const ExpressError=require("./utilis/ExpressError.js");
const wrapAsync=require("./utilis/wrapAsync.js");
const {listingSchema,reviewsSchema}=require("./schema.js");
const Review=require("./models/review.js");
const Listing=require("./models/listing.js");
const listings=require("./routes/listing.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');

const flash=require('connect-flash');
const passport=require("passport");
const LocalStrategy= require("passport-local");
const User=require("./models/user.js");
const userRouter=require("./routes/user.js");
const {isLoggedIn, isReviewAuthor}=require("./middleware.js")

const bookingRoutes = require("./routes/booking.js");


app.use('/bootstrap',express.static(path.join(__dirname,'node_modules/bootstrap/dist')));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")));


const dbUrl=process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to mongodb");
})
.catch((err)=>{
    console.log(err);
});


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET, 
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

const sessionoptions={
    store,
    secret:process.env.SECRET, 
    resave:false ,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 *24*60*60*1000,
        maxAge:7 *24*60*60*1000,
        httpOnly:true,
    }
};




app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/",(req,res)=>{
//     res.send("app is working.........");
// });



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
   next();
});

//demo user
// app.get("/demouser",async(req,res)=>{
//     let fakeUser= new User({
//         email: "student@gmail.com",
//         username:"delta-student",
//     });

//     let registeredUser=await User.register(fakeUser,"helllo");
//     res.send(registeredUser);
// });




async function main() {
  await mongoose.connect(dbUrl);

}
app.use("/listings",listings);
app.use("/",userRouter);
app.use("/book", bookingRoutes);




 const validateReview=(req,res,next)=>{
    let {error}=reviewsSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

};
//post Reviews
app.post("/listings/:id/reviews",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    console.log(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

         req.flash("success","NEW REVIEW CREATED!");

    res.redirect(`/listings/${listing._id}`);
}));
//delete review
app.delete("/listings/:id/reviews/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

    await Review.findByIdAndDelete(reviewId);

         req.flash("success","REVIEW DELETED!");

    res.redirect(`/listings/${id}`);
}));
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.render("listings/error.ejs",{err});
    
 });
app.listen(9000,()=>{
    console.log("app is listening on port 9000");
});