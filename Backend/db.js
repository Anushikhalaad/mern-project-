const mongoose = require("mongoose");
const mongoURI = "mongodb://ec2-13-235-132-74.ap-south-1.compute.amazonaws.com:27017/";

const connectToMongo = async () => {
  mongoose.connect(mongoURI, {
    family:4
})
    .then(() => {
        console.log('FINE');
    })
    .catch(() => {
        console.log("BAD");
    });
  await console.log("connected");
};

module.exports = connectToMongo;
