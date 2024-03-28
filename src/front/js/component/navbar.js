import React, { useContext }from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handlelogout(){
		actions.logout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Authentication</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Create Account</button>
					</Link>
					{store.auth === true ? <button onClick={()=>handlelogout()} className="btn btn-primary">Logout</button>
					: null}
				</div>
			</div>
		</nav>
	);
};