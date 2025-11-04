const productModel = require("../models/productModel.js");
const db = require("../config/DB.js");
const { default: mongoose } = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    await db()
    const products = await productModel.find(); //  await the query

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json(products); // use .json() to send data properly
  } catch (error) {
    res.status(500).json({ message: error.message }); // better status code for server errors
  }
};

const getProductBYId = async(req,res) =>{
    try {
        await db();
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"invalid id format"})
        }
        const productExist = await productModel.find({ _id: id });
        if(!productExist){
            return res.status(404).json({message:"product does not exist"});
        }
        res.status(200).json({productExist});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const addProduct = async(req,res)=>{
  try {
    await db()
    const {name, price, description, stockQuantity} = req.body;
    if(!name || !price || !description || !stockQuantity){
      return res.status(400).json({message:"All the fields are required i.e name, price, description, stockQuantity"});
    }
    const product = await new productModel({
      name,
      price,
      description,
      stockQuantity
    })
    await product.save()
    res.status(200).json({message:"product is created successfully",product})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const updateProduct = async (req,res) =>{
  try {
    await db()
    const productId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({message:"ProductID formate is invalid"});
    }
    const product = await productModel.findById(productId);
    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {$set:req.body},
      {new: true}
    )
    res.status(200).json({message:"product is updated successfully", updatedProduct});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

const deleteProduct = async (req,res) =>{
  try {
    await db();
    const productID = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productID)){
      return res.status(400).json({message:"invalid productID format"});
    }
    const product = await productModel.findById({_id:productID});
    if(!product){
      return res.status(404).json({message:"Product is not found"});
    }
    const deletedProduct = await productModel.findByIdAndDelete(productID);
    res.status(200).json({message:"product is deleted successfully", deletedProduct});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = {getAllProducts, getProductBYId, addProduct, updateProduct, deleteProduct};
