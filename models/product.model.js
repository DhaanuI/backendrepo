const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    userID:String
})


const ProductModel=mongoose.model("item",productSchema)

module.exports={
    ProductModel
}