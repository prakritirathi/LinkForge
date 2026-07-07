import { useState, type FormEvent } from "react";
import api from "../api/axios";

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !password.trim()) {
			setMessage("Name, email, and password are required.");
			return;
		}

		try {
			await api.post("/auth/signup", {
				name,
				email,
				password,
			});
			setMessage("Account created successfully. Please login.");
			setName("");
			setEmail("");
			setPassword("");
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Signup failed");
		}
	};

	return (
		<div>
			<h2>Signup</h2>
			<form onSubmit={handleSignup}>
				<div>
					<label>Name</label>
					<input
						required
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter name"
					/>
				</div>
				<div>
					<label>Email</label>
					<input
						required
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email"
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						required
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter password"
					/>
				</div>
				<button type="submit">Signup</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default Signup;