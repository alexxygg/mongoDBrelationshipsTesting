const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/mongoRelationshipsTwitter", {
  useNewUrlParser: true,
  //NO LONGER NEEDED WITH MONGOOSE 6
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tweetContent: String,
  likes: Number,
});

const User = mongoose.model("User", userSchema);

const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   const user = new User({
//     username: "alexxygg",
//     age: 23,
//   });
//   const tweet1 = new Tweet({
//     tweetContent: "My first tweet ever!",
//     likes: 551,
//   });
//   tweet1.user = user;
//   const tweet2 = new Tweet({
//     tweetContent: "I love my dog a lot.",
//     likes: 184,
//   });
//   tweet2.user = user;
//   await user.save();
//   tweet1.save();
//   tweet2.save();
// };

// makeTweets();

const findTweet = async () => {
  //To populate only certain key value pairs we can pass a second argument
  //to the populate method. Helps to make specific queries.

  //If we use findOne, we will get the first match,
  //find will give us all of them.
  const t = await Tweet.find({}).populate("user", "username");
  console.log(t);
};

findTweet();
