// app/screens/page.js
// import '../../bootstrap/dist/css/bootstrap.min.css'; // นำเข้าไฟล์ CSS ของ Bootstrap
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
			<h1>Screens00000066666</h1>
			{/* <pre>{JSON.stringify(screens, null, 2)}</pre> */}
			<table class="table">
			<thead>
				<tr>
				<th scope="col">#</th>
				<th scope="col">First</th>
				<th scope="col">Last</th>
				<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<th scope="row">1</th>
				<td>Mark</td>
				<td>Otto</td>
				<td>@mdo</td>
				</tr>
				<tr>
				<th scope="row">2</th>
				<td>Jacob</td>
				<td>Thornton</td>
				<td>@fat</td>
				</tr>
				<tr>
				<th scope="row">3</th>
				<td colspan="2">Larry the Bird</td>
				<td>@twitter</td>
				</tr>
			</tbody>
			</table>



			
		</div>
	);
};

export default ScreensPage;
