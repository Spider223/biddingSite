import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

import Header from "./component/Header";
import Home from "./component/Home";
import Products from "./component/Products";
import AddProduct from "./component/AddProduct";
import BidProduct from "./component/BidProduct";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header socket={socket} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} socket={socket} />
        <Route
          path="/products/bid/:name/:price"
          element={<BidProduct />}
          socket={socket}
        />
      </Routes>
    </>
  );
}

export default App;
