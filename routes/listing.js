const express=require("express");
const router=express.Router();
const wrapAsync=require("../utilis/wrapAsync.js");
const ExpressError=require("../utilis/ExpressError.js");
const {listingSchema,reviewsSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const session = require('express-session');
const flash=require('connect-flash');
const passport=require("passport");
const { isLoggedIn,isOwner } = require("../middleware.js");

const multer  = require('multer')
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage});
const geocode = require("../utilis/geocoder.js");





// const validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
        // next();
    // }

// };


//index route

router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

   
  //new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});



      //show route
     router.get("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
         let {id}=req.params;
         const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",}}).populate("owner");

         if(!listing){
         req.flash("error","Listing you requested for doesn't exist");
        return res.redirect("/listings");

         }
         console.log(listing);
         res.render("listings/show.ejs",{listing});
         
     
      }));  
      
       //create route
       router.post("/",isLoggedIn,upload.single("image"),wrapAsync(async(req,res)=>{
        let url=req.file.path;
        let filename=req.file.filename;
         let result=listingSchema.validate(req.body);
          //  console.log(result);

           
          let {title,description,price,location,country}=req.body;
          const place = `${location}, ${country}`;
           const geometry = await geocode(place);

          let newlisting=new Listing({
              title:title,
              description:description,
              price:price,
              location:location,
              country:country,
               geometry: geometry || { type: "Point", coordinates: [0, 0] },
              image: { url, filename },
              owner: req.user._id
               
             });
        

          newlisting.owner=req.user._id;
          newlisting.image={url,filename};
          await newlisting.save();


         req.flash("success","NEW LISTING CREATED!");
          
          res.redirect("/listings");
}));

// router.post("/",upload.single('image'),(req,res)=>{
    // res.send(req.file);
// });



     
      //edit route
      router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
         let {id}=req.params;
         
         const listing=await Listing.findById(id);

         if(!listing){
         req.flash("error","Listing you requested for doesn't exist");
          return res.redirect("/listings");

         }
         
         res.render("listings/edit.ejs",{listing});
         
     
      }));


       //update route
       router.put("/:id",isLoggedIn,isOwner,upload.single("image"),wrapAsync(async(req,res)=>{
          let {id}=req.params;
          
        let{title,description,price,location,country}=req.body;
        let listing=await Listing.findByIdAndUpdate(id,{
        title,description,price,location,country
          });

          if (location || country) {
        const place = `${location}, ${country}`;
        const geometry = await geocode(place);
        if (geometry) {
            listing.geometry = geometry;
        }
    }

       if( typeof req.file !== "undefined"){
         let url=req.file.path;
          let filename=req.file.filename;
          listing.image={url,filename};
          await listing.save();
       }

      req.flash("success","LISTING UPDATED!");
      res.redirect(`/listings/${id}`);
       }));
      

        //delete route
        router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
           let {id}=req.params;
           let deletedlisting=await Listing.findByIdAndDelete(id);
          //  console.log(deletedlisting);
           req.flash("success","LISTING DELETED!");

           res.redirect("/listings");
        }));

     module.exports=router;