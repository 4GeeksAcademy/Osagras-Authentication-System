import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendData = async(e) => {
        e.preventDefault()
        let resp = await actions.signup(email, password)
        if (resp){
            navigate("/login")
        }
        setEmail("")
        setPassword("")
    }

	return (
		<div className="container mt-3">
                    <form className="w-50 mx-auto">
                        <div className="mb-3">
                            <h1>Create an account</h1>
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                        </div>
                            <button onClick={(e) => sendData(e)} type="submit" className="btn btn-primary">Create account</button>          
                    </form>
		</div>
	);
};