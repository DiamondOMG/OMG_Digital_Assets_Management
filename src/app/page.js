"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import BigC from "./bigc/page";

const ScreensPage = () => {
	const [screens, setScreens] = useState(null); // สร้าง state สำหรับเก็บข้อมูล screens
	const [error, setError] = useState(null); // สร้าง state สำหรับเก็บข้อมูลข้อผิดพลาด

	useEffect(() => {
		// ฟังก์ชันสำหรับดึงข้อมูล API
		const fetchScreens = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/screens`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch screens");
				}
				const data = await response.json();
				setScreens(data); // เก็บข้อมูลที่ดึงมาได้ใน state
			} catch (error) {
				setError(error.message); // เก็บข้อความข้อผิดพลาดใน state
			}
		};

		fetchScreens(); // เรียกใช้ฟังก์ชันดึงข้อมูล
	}, []); // ใช้ useEffect โดยมี dependency เป็น array ว่าง เพื่อให้ดึงข้อมูลแค่ครั้งเดียวตอน mount

	// กรณีเกิดข้อผิดพลาด
	if (error) {
		return <div>Error loading screens data: {error}</div>;
	}

	// กรณีข้อมูลยังไม่ถูกโหลด
	if (!screens) {
		return <div>Loading screens...</div>;
	}

	// แสดงข้อมูลเมื่อโหลดสำเร็จ
	return (
		<div>
			<BigC data={screens} />
		</div>
	);
};

export default ScreensPage;
