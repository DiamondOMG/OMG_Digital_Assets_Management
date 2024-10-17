// app/screens/page.js

const username = "api@omg.group";
const password = "V041Digq";
const apiUrl =
	"https://stacks.targetr.net/rest-api/v1/screens?groupId=034CD62B516544";

// กำหนดให้รีเฟรชทุก 60 วินาที
export const revalidate = 60;

const fetchScreens = async () => {
	// ใช้ URL แบบสมบูรณ์
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/screens`
	); // เรียกใช้ Serverless API
	if (!response.ok) {
		throw new Error("Failed to fetch screens");
	}
	return response.json();
};

const ScreensPage = async () => {
	const screens = await fetchScreens();

	return (
		<div>
			<h1>Screens000000</h1>
			<pre>{JSON.stringify(screens, null, 2)}</pre>
		</div>
	);
};

export default ScreensPage;
