import React from "react";
import { logo } from "../assets";
import Home from "./Home";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLogged, setIsLogged] = React.useState(false);

  const checkCredentials = () => {
    if (email === "admin@rnp.gov.rw" && password === "admin") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  return (
    <div className="login-container">
      <img src={logo} alt="logo" />
      <div className="login-layout">
        <h1>Log in</h1>
        <form action="">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(emailChanges) => setEmail(emailChanges)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder=".........."
            onChange={(passwordChanges) => setPassword(passwordChanges)}
          />
        </form>
        <p>forgot password?</p>
        <button disabled={!isLogged}>
          <a href="/home">GET IN</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
