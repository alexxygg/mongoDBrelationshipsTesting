const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/mongoRelationshipsFarm", {
  useNewUrlParser: true,
  //NO LONGER NEEDED WITH MONGOOSE 6
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: { type: String, enum: ["Spring", "Summer", "Fall", "Winter"] },
});

const Product = mongoose.model("Product", productSchema);

//We only call Schema because we saved mongoose.Schema
//into its own variable.
const farmSchema = new Schema({
  name: String,
  city: String,
  //Same here.
  //This tells mongoose to look for the ids available in Products
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   { name: "Apple", price: 20, season: "Summer" },
//   { name: "Banana", price: 25, season: "Spring" },
//   { name: "Orange", price: 15, season: "Fall" },
// ]);

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Happy Cow Farms", city: "Dallas" });
//   const orange = await Product.findOne({ name: "Orange" });
//   farm.products.push(orange);
//   await farm.save();
//   console.log(farm);
// };

// makeFarm();

// const pushProduct = async () => {
//   const farm = await Farm.findOne({ name: "Happy Cow Farms" });
//   const orange = await Product.findOne({ name: "Orange" });
//   farm.products.push(orange);
//   console.log(orange);
// };

// pushProduct();

// const newProduct = async () => {
//   const farm = await Farm.findOne({ name: "Happy Cow Farms" });
//     const products = await Farm.findOne({ products });
//   const lemon = new Product({
//     name: "Lemon",
//     price: 50,
//     season: "Spring",
//   });
//   farm.products.push(lemon);
//   await farm.save();
//   console.log(lemon);
// };

// newProduct();

Farm.find({})
  .populate("products")
  .then((x) => console.log(x));

// Product.find({});
