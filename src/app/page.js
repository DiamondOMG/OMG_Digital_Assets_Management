import Example from "./example/page";

// กำหนดให้รีเฟรชทุก 600 วินาที
export const revalidate = 600;

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

	// ตรวจสอบกรณีที่ screens เป็น undefined
	if (!screens) {
		return <div>Error loading screens data.</div>; // แสดงข้อความเมื่อเกิดข้อผิดพลาด
	}

	return (
		<div>
			<Example data={screens} />
		</div>
	);
};

export default ScreensPage;
