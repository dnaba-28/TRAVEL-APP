const Listing=require("./models/listing");
const Review=require("./models/review");

module.exports.isLoggedIn = (req,res,next)=>{
    console.log(req.path, ".." , req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged in to create listing");
    return res.redirect("/login");
   }
   next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async (req,res,next)=>{
     let {id}=req.params;
          let listing=await Listing.findById(id);

          if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","you are not the owner of this listing");
            return res.redirect(`/listings/${id}`);
          }

          next();
};

module.exports.isReviewAuthor=async (req,res,next)=>{
     let {id,reviewId}=req.params;
          let review=await Review.findById(reviewId);

          if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error","you are not the author of this listing");
            return res.redirect(`/listings/${id}`);
          }

          next();
};