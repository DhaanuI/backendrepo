const express = require("express")
const app = express();
require("dotenv").config();
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const { connection } = require("./config/db");
const { productRoute } = require("./routes/product.route");
const { userRoute } = require("./routes/user.route");

app.use("/products", productRoute)
app.use("/users", userRoute)


app.get("/", (req, res) => {
      res.send("Homepage")
})


app.listen(process.env.port, async (req, res) => {
      try {
            await connection;
            console.log("connected to db")
      }
      catch (err) {
            console.log(err)
      }

      console.log("server is on")
})
