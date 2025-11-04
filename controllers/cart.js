const connectDB = require("../config/DB.js");
const cartModel = require("../models/cartModel.js");
const productModel = require("../models/productModel.js")
const mongoose = require("mongoose")

const addCartItem = async (req, res) => {
    try {
        await connectDB();

        const { productId, quantities } = req.body;
        // validating productID format

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ messages: "invalid productId formate" })
        }
        // Check if product exists
        const product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({ message: "Product does not exist" });
        }
        let cartItem = await cartModel.findOne({
            userId: req.user.id,
            productId

        })

        // Attach userId from authMiddleware
        if (cartItem) {
            cartItem.quantities += quantities;
        } else {
            cartItem = new cartModel({
                userId: req.user.id,
                productId,
                quantities,
            });
        }
        await cartItem.save();

        res.status(200).json({ cartItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
;

const getAllCartItem = async (req, res) => {
    try {
        await connectDB()
        const items = await cartModel.find();
        if (!items) {
            return res.status(404).json({ message: "cart is empty" });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateCartQuantity = async (req, res) => {
    try {
        await connectDB();
        const cardId = req.params.id;
        const quantities = req.body.quantities;
        if (!mongoose.Types.ObjectId.isValid(cardId)) {
            return res.status(400).json({ message: "invalid card ID format" })
        }

        if (!quantities || quantities < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" })
        }
        const updatedItem = await cartModel.findOneAndUpdate(
            { _id: cardId, userId: req.user.id },
            { $set: { quantities } },
            { new: true }
        )
        if (!updatedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({
            message: "Cart item updated successfully",
            updatedItem,
        });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

const deleteCartItem = async (req, res) => {
    try {
        await connectDB();
        const cardId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(cardId)) {
            return res.status(400).json({ messages: "Invalid card ID formate" });
        }
        const deletedItem = await cartModel.findByIdAndDelete({ _id: cardId, userId: req.user.id })
        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({
            message: "Cart item deleted successfully",
            deletedItem
            
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addCartItem, getAllCartItem, deleteCartItem, updateCartQuantity };
