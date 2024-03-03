const express = require("express")
const router = express.Router()
var a= 1;


const productController = require("../controller/product.controller")

router.get("/image", productController.getImage)

module.exports = router