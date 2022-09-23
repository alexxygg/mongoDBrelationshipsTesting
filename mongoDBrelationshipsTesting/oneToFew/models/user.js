const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mongoRelationships", {
  useNewUrlParser: true,
  //NO LONGER NEEDED WITH MONGOOSE 6
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      //We can turn off the automatic id set by
      //Mongoose on each embedded schema
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      zipCode: Number,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

// const makeUser = async () => {
//   const u = new User({
//     first: "Joe",
//     last: "Doe",
//   });
//   u.addresses.push({
//     street: "FAKE Rd",
//     city: "Jacksonville",
//     state: "Ohio",
//     zipCode: 552,
//     country: "United States",
//   });
//   const result = await u.save();
//   console.log(result);
// };

// makeUser();

// const newAddress = async (id) => {
//   const u = await User.findById(id);
//   u.addresses.push({
//     street: "FAKE St",
//     city: "New York",
//     state: "New York",
//     zipCode: 85545,
//     country: "United States",
//   });
//   const result = await u.save();
//   console.log(result);
// };

// newAddress("632ce33bf46886f9851f5d59");
