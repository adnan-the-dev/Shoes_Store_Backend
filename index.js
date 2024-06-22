const Users = require("./modles/User");
const AddiasProduct = require("./modles/ShoesProducts");
const Orders = require("./modles/placeOrder");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(morgan("common"));

dotenv.config();

const { MONGO_URL, PORT } = process.env;

app.use(express.json());

// mongoo connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("succesfully connected to database");
    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("an error occured", err);
  });

// register API

app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPssword = await bcrypt.hash(req.body.password, salt);
    const user = new Users({
      username: req.body.username,
      password: bcryptPssword,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postalCode: req.body.postalCode,
    });
    const saveUser = await user.save();
    return res.json(saveUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message || "some error ecured",
    });
  }
});


// Login API

app.post("/login/user", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("This email doesn't exist.");
    }

    const UserPassword = await bcrypt.compare(req.body.password, user.password);
    if (!UserPassword) {
      return res.status(400).send("The password provided is incorrect.");
    }
    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});



app.get("/addiasProduct", async (req, res) => {
  try {
    const product = await AddiasProduct.find();
    return res
      .status(200)
      .send({ success: true, message: "addias product", result: product });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: e.message || "some error ecured" });
  }
});

//Get single product api
app.get("/addiasProduct/:id", async (req, res) => {
  try {
    const product = await AddiasProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Products not found.");
    } else {
      return res.send(product);
    }
  } catch (e) {
    return res.json(e);
  }
});

//postPlace order api

app.post("/orders", async (req, res) => {
  try {
    const order = new Orders({
      userName: req.body.userName,
      userId: req.body.userId,
      subTotal: req.body.subTotal,
      items: req.body.items,
    });
    const saveOrder = await order.save();
    return res.json(saveOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message || "some error ecured",
    });
  }
});

//getAllOrders api

app.get("/orders", async (req, res) => {
  try {
    // const pendingOrder = await Orders.find().populate('items.itemId')
    const pendingOrder = await Orders.find({ userName: req.query.username });
    return res
      .status(200)
      .send({ success: true, message: "ordes", result: pendingOrder });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: e.message || "some error ecured" });
  }
});

//pendingOrders api

app.get("/orders/pending", async (req, res) => {
  try {
    const pendingOrder = await Orders.find({ status: "pending" });
    return res
      .status(200)
      .send({ success: true, message: "ordes", result: pendingOrder });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: e.message || "some error ecured" });
  }
});
//changeStatus api

app.put("/orders/:id/complete", async (req, res) => {
  try {
    const singleOrder = await Orders.findById(req.params.id);
    singleOrder.status = "complete";
    const resulet = await singleOrder.save();
    return res
      .status(200)
      .send({ success: true, message: "ordes", result: resulet });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: e.message || "some error ecured" });
  }
});

//completeOrders api

app.get("/orders/complete", async (req, res) => {
  try {
    const completeOrder = await Orders.find({
      status: "complete",
      userName: req.query.username,
    });
    return res
      .status(200)
      .send({ success: true, message: "ordes", result: completeOrder });
  } catch (e) {
    return res
      .status(500)
      .send({ success: false, message: e.message || "some error ecured" });
  }
});

//singleOrders api

app.get("/orders/:id", async (req, res) => {
  try {
    const singleOrder = await Orders.findById(req.params.id);
    if (!singleOrder) {
      return res.status(400).send("Order not found");
    } else {
      return res.json(singleOrder);
    }
  } catch (e) {
    return res.json(e);
  }
});


app.get("/", async (req, res) => {
  res.json({
    message:"server is running"
  })
    
});
