import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, price, owner: localStorage.getItem("username") });
    // if (props.socket) {
    //   props.socket.emit("addProduct", {
    //     name,
    //     price,
    //     owner: localStorage.getItem("username"),
    //   });
    // } else {
    //   console.error("socket is undefined");
    //   console.log("emit", socket.emit);
    // }

    // socket.emit("addProduct", {
    //   name,
    //   price,
    //   owner: localStorage.getItem("username"),
    // });

    socket.emit("addProduct", {
      name,
      price,
      owner: localStorage.getItem("username"),
    });

    navigate("/products");
  };

  return (
    <div>
      <div className="addproduct__container">
        <h2>Add a new product</h2>
        <form className="addProduct__form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name of the product</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="price">Starting price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button className="addProduct__cta">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
