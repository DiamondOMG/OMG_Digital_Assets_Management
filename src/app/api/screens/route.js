import axios from "axios";

const username = "api@omg.group";
const password = "V041Digq";
const apiUrl =
	"https://stacks.targetr.net/rest-api/v1/screens?groupId=034CD62B516544";

export async function GET() {
	try {
		const options = {
			headers: {
				Authorization:
					"Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
			},
		};

		const response = await axios.get(apiUrl, options);

		return new Response(JSON.stringify(response.data), {
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
