import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await api.get("/auth/me");
				setIsLoggedIn(true);
			} catch {
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	if (isLoading) {
		return (
			<div className="app">
				<div className="container">
					<h1>LinkForge</h1>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="app">
			<div className="container">
				<div className="header">
					<div>
						<h1>LinkForge</h1>
						<p>Shorten, track, and manage your links.</p>
					</div>
				</div>
				{isLoggedIn ? (
					<Dashboard setIsLoggedIn={setIsLoggedIn} />
				) : (
					<div className="auth-grid">
						<div className="card">
							<Signup />
						</div>
						<div className="card">
							<Login setIsLoggedIn={setIsLoggedIn} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;