import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<div>
			<h1>LinkForge</h1>
			{isLoggedIn ? (
				<Dashboard setIsLoggedIn={setIsLoggedIn} />
			) : (
				<>
					<Signup />
					<hr />
					<Login setIsLoggedIn={setIsLoggedIn} />
				</>
			)}
		</div>
	);
}

export default App;