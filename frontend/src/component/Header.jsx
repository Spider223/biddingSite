import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

const Header = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("addProductResponse", (data) => {
      setNotification(
        `${data.owner} just added ${data.name} worth $${Number(
          data.price
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on("bidProductResponse", (data) => {
      setNotification(
        `${data.last_bidder} just bid ${data.name} for $${Number(
          data.userInput
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  return (
    <nav className="navbar">
      <div className="header">
        <Link to="/">
          <h2>Bid Items</h2>
        </Link>
      </div>

      <div>
        <p style={{ color: "red" }}>{notification}</p>
      </div>
    </nav>
  );
};

export default Header;
