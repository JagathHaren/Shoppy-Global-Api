const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,   // reference to User model
    ref: "user",                             // should match your userModel name
    required: true
  },
  productId: {
   type:mongoose.Schema.Types.ObjectId,
   ref:"product",
   require:true,
  },
  quantities: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = mongoose.model("cart", cartSchema);
