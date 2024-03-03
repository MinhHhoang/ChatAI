const express = require("express")
const app = express()
var a= 1;

require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())


const cors = require("cors")
app.use(cors())

const productRouter = require('./routes/product.router')

app.use("/api/products", productRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})