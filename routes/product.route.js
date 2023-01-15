const express = require("express");
const { ProductModel } = require("../models/product.model");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middlewares/authenticator.middleware");
const productRoute = express.Router();
productRoute.use(express.json())
productRoute.use(authenticate)


productRoute.get("/", async (req, res) => {

    try {
        const prod = await ProductModel.find()
        res.send(prod)
    }
    catch (err) {
        res.send({ "err": "something went wrong" })
    }
})


productRoute.post("/create", async (req, res) => {
    const data = req.body;

    try {
        const prod = new ProductModel(data)
        await prod.save()
        res.send("Data is added to DB")

    }
    catch (err) {
        res.send({ "err": "something went wrong" })
    }
})

productRoute.patch("/update/:id", async (req, res) => {
    const info = req.body
    const ID = req.params.id;

    const product = await ProductModel.findOne({ "_id": ID })
    const userID_in_product = product.userID;
    const userID_making_req = req.body.userID;

    try {
        if (userID_in_product !== userID_making_req) {
            res.send({ "message": "you are not auth" })
        }
        else {
            const data = await ProductModel.findByIdAndUpdate({ _id: ID }, info)
            res.send("Data modified")
        }


    }
    catch (err) {
        res.send({ "err": "something went wrong" })
    }
})

productRoute.delete("/delete/:id", async (req, res) => {

    const ID = req.params.id;

    const product = await ProductModel.findOne({ "_id": ID })
    const userID_in_product = product.userID;
    const userID_making_req = req.body.userID;
    try {
        if (userID_in_product !== userID_making_req) {
            res.send({ "message": "you are not auth" })
        }
        else {
            const data = await ProductModel.findByIdAndDelete({ _id: ID })
            res.send("Data deleted")
        }


    }
    catch (err) {
        res.send({ "err": "something went wrong" })
    }
})


module.exports = {
    productRoute
}