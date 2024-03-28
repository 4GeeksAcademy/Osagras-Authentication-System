import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";



export const Account = () => {
	const { store, actions } = useContext(Context);

	function handlelogout(){
		actions.logout()
		navigate('/')
	}

	return (
		<div className="text-center mt-5">
			<h1>Your Account</h1>
			<p>Welcome to your account</p>
			{store.auth === true ? <button onClick={()=>handlelogout()} className="btn btn-primary">Logout</button>
					: null}
		</div>
	);
};