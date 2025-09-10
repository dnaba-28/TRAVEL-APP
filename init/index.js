const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL=process.env.ATLASDB_URL;


main()
.then(()=>{
    console.log("connected to db");
})
.catch(()=>{
    console.log(err);
});


async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'68ab2c8e69fee974d1c8c197'}));
    
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();