//  const axios = require("axios");
//  async function geocode(place) {
//   try {
//     const res = await axios.get("https://nominatim.openstreetmap.org/search", {
//       params: { q: place, format: "json", limit: 1 },
//       headers: { "User-Agent": "YourAppName (your@email.com)" }
//     });

//     if (res.data.length > 0) {
//       return {
//         type: "Point",
//         coordinates: [
//           parseFloat(res.data[0].lon),
//           parseFloat(res.data[0].lat),
//         ]
//       };
//     }
//   } catch (err) {
//     console.error("Geocode error:", err.message);
//   }
//   return null; // fallback if geocode fails
// }
// module.exports=geocode;

// utils/geocoder.js
const axios = require("axios");

async function geocode(place) {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: { q: place, format: "json", limit: 1 },
      headers: { "User-Agent": "YourAppName (your@email.com)" },
    });

    if (res.data.length > 0) {
      return {
        type: "Point",
        coordinates: [
          parseFloat(res.data[0].lon),
          parseFloat(res.data[0].lat),
        ],
      };
    } else {
      console.warn("⚠️ No geocode result found for:", place);
    }
  } catch (err) {
    console.error("❌ Geocode error:", err.message);
  }

  // 🔹 Always return fallback coordinates if geocoding fails
  return {
    type: "Point",
    coordinates: [0, 0], // (longitude, latitude)
  };
}

module.exports = geocode;
