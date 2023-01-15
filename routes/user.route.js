const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken")
const userRoute = express.Router();
userRoute.use(express.json())
const bcrypt = require('bcrypt');

userRoute.post("/register", async (req, res) => {

    const { email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, securedpassword) => {
            if (err) {
                res.send("error")
                console.log(err)
            }
            else {
                const user = new UserModel({ email, pass: securedpassword })
                await user.save()
                res.send("Data is added to DB")
            }
        })

    }
    catch (err) {
        res.send({ "err": "something went wrong" })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.find({ email });

        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "masai", { expiresIn: '1h' });
                    res.send({ "msg": "login successful", "token": token })
                }
                else {
                    res.send("wrong credentials")
                }
            });

        }
        else {
            res.send("wrong credentials")
        }
    }
    catch (err) {
        res.send({ "err": "something went wrong" })
    }
})

module.exports = {
    userRoute
}