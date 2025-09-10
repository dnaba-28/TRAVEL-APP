

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb+srv://dnnabanita_db_user:ILDM0OMegESvEQzJ@cluster0.ttdjtmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// debug line



// main()
// .then(()=>{
//     console.log("connected to db");
// })
// .catch((err)=>{
//     console.log(err);
// });


async function main() {
    try{
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
  await initDB();
  mongoose.connection.close();
    }catch(err){
        console.log(err);
    }

}

async function initDB(){
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'68ab2c8e69fee974d1c8c197'}));
    
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

main();