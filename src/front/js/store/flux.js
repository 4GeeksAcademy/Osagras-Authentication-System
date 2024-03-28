const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false
		},

		actions: {
			signup: (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(
						{
							"email":email,
							"password":password
						}
					)
				  };
				  
				fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
					.then(response => {
						if(response.status == 200){
							setStore({ auth: true });
						}
						return response.text()
					})
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},

			login: (email,password) => {
				 const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(
						{
							"email":email,
							"password":password
						}
					)
				};
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						console.log(response.status)
						if(response.status === 200){
							setStore({ auth: true });
						}
						return response.json()
					})
					.then(data => {
						localStorage.setItem("token", data.access_token);
						console.log(data)

					});
			},
			
			logout: () => {
				setStore({ auth: false });
				localStorage.removeItem("token");				
			},
		}
	};
};

export default getState;
