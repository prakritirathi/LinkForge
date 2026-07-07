import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import api from "../api/axios";

interface UrlHistoryItem {
	originalUrl: string;
	shortCode: string;
	clicks: number;
	createdAt: string;
	updatedAt: string;
}

interface UrlStats {
	shortCode: string;
	originalUrl: string;
	clicks: number;
	followed: boolean;
	createdAt: string;
	updatedAt: string;
}

interface DashboardProps {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Dashboard({ setIsLoggedIn }: DashboardProps) {
	const [originalUrl, setOriginalUrl] = useState("");
	const [shortCode, setShortCode] = useState("");
	const [message, setMessage] = useState("");
	const [history, setHistory] = useState<UrlHistoryItem[]>([]);
	const [stats, setStats] = useState<UrlStats | null>(null);

	const fetchHistory = async () => {
		try {
			const response = await api.get("/url/history");
			setHistory(response.data.urls || response.data.data || response.data);
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Failed to fetch history");
		}
	};

	const fetchStats = async (shortCode: string) => {
		try {
			const response = await api.get(`/url/${shortCode}/stats`);
			const statsData =
				response.data.stats ||
				response.data.data ||
				response.data;
			setStats(statsData);
			setMessage("Stats loaded successfully");
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Failed to fetch stats");
		}
	};

	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
			setMessage("Logged out successfully");
			setIsLoggedIn(false);
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Logout failed");
		}
	};

	const copyToClipboard = async (shortCode: string) => {
		const shortUrl = `http://localhost:3000/${shortCode}`;
		try {
			await navigator.clipboard.writeText(shortUrl);
			setMessage("Short URL copied to clipboard");
		} catch {
			setMessage("Failed to copy URL");
		}
	};

	const handleCreateUrl = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await api.post("/url", {
				originalUrl,
			});
			const generatedShortCode =
				response.data.shortUrl ||
				response.data.shortCode ||
				response.data.data?.shortCode;

			if (!generatedShortCode) {
				setMessage("Short URL created, but shortCode was not found in response");
				return;
			}

			setShortCode(generatedShortCode);
			setMessage("Short URL created successfully");
			setOriginalUrl("");
			fetchHistory();
		} catch (error: any) {
			setMessage(error.response?.data?.message || "Failed to create short URL");
		}
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
			<form onSubmit={handleCreateUrl}>
				<input
					type="url"
					value={originalUrl}
					onChange={(e) => setOriginalUrl(e.target.value)}
					placeholder="Enter long URL"
				/>
				<button type="submit">Shorten URL</button>
			</form>
			<button type="button" onClick={fetchHistory}>
				Load History
			</button>
			{message && <p>{message}</p>}
			{shortCode && (
				<div>
					<p>Short URL:</p>
					<a
						href={`http://localhost:3000/${shortCode}`}
						target="_blank"
						rel="noreferrer"
					>
						http://localhost:3000/{shortCode}
					</a>
					<button type="button" onClick={() => copyToClipboard(shortCode)}>
						Copy
					</button>
				</div>
			)}
			{history.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Original URL</th>
							<th>Short URL</th>
							<th>Clicks</th>
							<th>Action</th>
							<th>Stats</th>
						</tr>
					</thead>
					<tbody>
						{history.map((url) => (
							<tr key={url.shortCode}>
								<td>{url.originalUrl}</td>
								<td>
									<a
										href={`http://localhost:3000/${url.shortCode}`}
										target="_blank"
										rel="noreferrer"
									>
										http://localhost:3000/{url.shortCode}
									</a>
								</td>
								<td>{url.clicks}</td>
								<td>
									<button type="button" onClick={() => copyToClipboard(url.shortCode)}>
										Copy
									</button>
								</td>
								<td>
									<button type="button" onClick={() => fetchStats(url.shortCode)}>
										Stats
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{stats && (
				<div>
					<h3>URL Stats</h3>
					<p>Short Code: {stats.shortCode}</p>
					<p>Original URL: {stats.originalUrl}</p>
					<p>Clicks: {stats.clicks}</p>
					<p>Followed: {stats.followed ? "Yes" : "No"}</p>
					<p>Created At: {new Date(stats.createdAt).toLocaleString()}</p>
					<p>Updated At: {new Date(stats.updatedAt).toLocaleString()}</p>
				</div>
			)}
		</div>
	);
}

export default Dashboard;