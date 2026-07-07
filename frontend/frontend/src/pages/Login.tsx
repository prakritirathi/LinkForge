import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import api from "../api/axios";

interface LoginProps {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Login({ setIsLoggedIn }: LoginProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await api.post("/auth/login", {
				email,
				password,
			});
			setMessage(response.data.message || "Login successful");
			setIsLoggedIn(true);
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Login failed");
		}
	};

	const checkCurrentUser = async () => {
		try {
			const response = await api.get("/auth/me");
			setMessage(`Logged in as ${response.data.user.email}`);
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Not authenticated");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email"
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter password"
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<button type="button" onClick={checkCurrentUser}>
				Check Current User
			</button>
			{message && <p>{message}</p>}
		</div>
	);
}

export default Login;