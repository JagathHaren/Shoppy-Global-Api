const router = require("express").Router();
const {getAllProducts, getProductBYId, addProduct, updateProduct, deleteProduct} = require("../controllers/products.js")
router.get("/", getAllProducts);
router.get("/:id", getProductBYId);
router.post("/", addProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
module.exports = router;