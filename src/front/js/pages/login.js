import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, actions } = useContext(Context);


  function sendData(e) {
    e.preventDefault();
    console.log('send data');
    console.log(email, password);
    actions.login(email, password)
  }

  return (
    <div className="container mt-3">
       {store.auth === true ? <Navigate to="/Account" /> : 
        <form className="w-50 mx-auto" onSubmit={sendData}>
          <div className="mb-3">
            <h1>Login to your account</h1>
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="emailInput" className="form-control"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput"></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      }
    </div>
  );
}

export default Login;