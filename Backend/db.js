// const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017"

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected to Mongo");
//     })
// }

// module.exports=connectToMongo;
const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // Change this to your actual database URI

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to Mongo");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

module.exports = connectToMongo;
