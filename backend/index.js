const express = require("express");
const app = express();

const port = 4000;

const fs = require("fs");
const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const rawData = fs.readFileSync("data.json");
const productData = JSON.parse(rawData);

app.use(cors());

function findProduct(nameKey, productsArray, last_bidder, amount) {
  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].name === nameKey) {
      productsArray[i].last_bidder = last_bidder;
      productsArray[i].price = amount;
    }
  }

  const stringData = JSON.stringify(productData, null, 2);
  fs.writeFile("data.json", stringData, (err) => {
    console.error(err);
  });
}

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  socket.on("addProduct", (data) => {
    console.log(data);
    productData["products"].push(data);
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile("data.json", stringData, (err) => {
      console.error(err);
    });

    socket.broadcast.emit("addProductResponse", data);
  });
  socket.on("bidProduct", (data) => {
    findProduct(
      data.name,
      productData["products"],
      data.last_bidder,
      data.userInput
    );

    socket.broadcast.emit("bidProductResponse", data);
  });
});

app.get("/api", (req, res) => {
  res.json(productData);
});

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
