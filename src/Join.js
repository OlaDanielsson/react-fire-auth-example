import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user) Auth.setLoggedIn(true);
      })
      .catch(e => {
        setErrors(e.message);
      });
  };

  return (
    <div className="text-center">
      
      <h1 className="h2 mb-3 font-weight-normal">Registrera</h1>
      <form className="form-signin" onSubmit={e => handleForm(e)}>
        <input
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="e-post"
        />
        <input
          className="form-control"
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="lösenord"
        />
        <hr />

        <button className="btn btn-lg btn-primary shadow btn-block" type="submit">Registrera</button>

        <button className="btn btn-block btn-primary shadow btn-font" type="button">
          <img
            className="img-fluid float-left" width="30" height="30"            
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Registrera med Google
        </button>

        

        <span>{error}</span>
      </form>
    </div>
  );
};

export default Join;
