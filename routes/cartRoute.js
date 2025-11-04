const router = require("express").Router();
const {addCartItem,getAllCartItem, deleteCartItem, updateCartQuantity} = require("../controllers/cart.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/",authMiddleware, addCartItem);
router.get("/",authMiddleware, getAllCartItem)
router.put("/:id",authMiddleware, updateCartQuantity)
router.delete("/:id",authMiddleware, deleteCartItem)

module.exports = router;
