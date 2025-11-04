const express = require("express");
const app = express();
require("dotenv").config()
const userAuthRoute = require("./routes/userAuth.js");
const productRoute = require("./routes/productsRoute.js");
const cartRoute = require("./routes/cartRoute.js")
const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js")
app.use(express.json())
//user route config
app.use("/user", userAuthRoute)

// product route is config
app.use("/products", productRoute);

// cart route is config
app.use("/cart", cartRoute)

// handling undefined routes
app.use(notFound);

//handling error

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`)
})