import axios from "axios";

const username = "api@omg.group";
const password = "V041Digq";
const apiUrl =
	"https://stacks.targetr.net/rest-api/v1/screens?groupId=034CD62B516544";

const THAI_TIME_OFFSET = 7 * 60 * 60 * 1000; // UTC+7 hours in milliseconds
const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds

function formatTimestamp(timestamp) {
	const date = new Date(Number(timestamp) + THAI_TIME_OFFSET);
	return date.toISOString().replace("T", " ").substring(0, 19); // Convert to 'YYYY-MM-DD HH:mm:ss'
}

export async function GET() {
	try {
		const options = {
			headers: {
				Authorization:
					"Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
			},
		};

		const response = await axios.get(apiUrl, options);

		const rawData = response.data;

		const currentTime = Date.now(); // Get current time in milliseconds

		const normalizeData = rawData.map((obj) => {
			const lastOnline = formatTimestamp(obj.data.lastLoaderCommsMillis);
			const lastLoaderMillis = Number(obj.data.lastLoaderCommsMillis);
			const status =
				currentTime - lastLoaderMillis > FIVE_DAYS_IN_MS ? "offline" : "online";

			return {
				screenId: obj.data.screenId,
				label: obj.data.label,
				storeCode: obj.data.storeCode,
				storeLocation: obj.data.storeLocation,
				storeSection: obj.data.storeSection,
				displaysConnected: obj.data.displaysConnected,
				runNumber: obj.data.runNumber,
				wifiSsid: obj.data.wifiSsid,
				lastOnline, // Renamed field
				status, // Added status field
			};
		});

		return new Response(JSON.stringify(normalizeData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error fetching data: ", error);
		return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
