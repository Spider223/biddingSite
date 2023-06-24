import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/products");
  };

  return (
    <div>
      <form className="home__form" onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="home__input"
          required
          minLength={6}
        />
        <button className="home__cta">SIGN IN</button>
      </form>
    </div>
  );
}
