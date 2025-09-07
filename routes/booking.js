// // routes/bookings.js
// const express = require("express");
// const router = express.Router();
// const Listing = require("../models/listing");
// const Booking = require("../models/booking");

// // POST booking
// router.post("/:id", async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.listingId);
//     console.log("Form Data:", req.body); 
//     console.log("Listing Found:", listing);
//     const { checkIn, checkOut } = req.body;

//     // Calculate days and price
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);
//     const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//     const totalPrice = nights * listing.price;

//     const booking = new Booking({
//       listing: listing._id,
//       user: req.user._id, // logged-in user
//       checkIn,
//       checkOut,
//       totalPrice
//     });

//     await booking.save();
//     res.send(`Booking confirmed from ${checkIn} to ${checkOut}. Pay ₹${totalPrice} at property.`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error creating booking");
//   }
//   console.log("Booking route hit!", req.params.listingId, req.body);
// });

// module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

// POST /book/:id
router.post("/:id", isLoggedIn, async (req, res) => {
  console.log("Booking route hit!", req.params.id, req.body);

  const { id } = req.params;
  const { checkIn, checkOut } = req.body;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Example: booking details
  const booking = {
    user: req.user._id,
    checkIn,
    checkOut,
    price: listing.price
  };

  if (!listing.bookings) listing.bookings = [];
  listing.bookings.push(booking);

  await listing.save();

  req.flash("success", "Booking confirmed!");
  res.redirect(`/listings/${id}`);
});

module.exports = router;

