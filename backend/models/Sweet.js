import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["Chocolate", "Nut", "Milk", "Flour", "Candy", "Pastry"],
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 0 },
});

const Sweets = mongoose.model("Sweets", sweetSchema);

export default Sweets;
