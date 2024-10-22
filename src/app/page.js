"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Table from "@/components/table";
import Loader from "@/components/loader";

const ScreensPage = () => {
	const [data, setData] = useState(null); // สร้าง state สำหรับเก็บข้อมูล screens
	const [error, setError] = useState(null); // สร้าง state สำหรับเก็บข้อมูลข้อผิดพลาด

	useEffect(() => {
		// ฟังก์ชันสำหรับดึงข้อมูล API
		const fetchScreens = async () => {
			try {
				const response = await fetch(`/api/screens`);
				if (!response.ok) {
					throw new Error("Failed to fetch screens");
				}
				const data = await response.json();
				setData(data); // เก็บข้อมูลที่ดึงมาได้ใน state
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
	if (!data) {
		return <Loader />;
	}

	const columns = [
		{ accessorKey: "screenId", header: "Screen ID", size: 150 },
		{ accessorKey: "label", header: "Label", size: 200 },
		{ accessorKey: "storeLocation", header: "Store Location", size: 200 },
		{ accessorKey: "storeSection", header: "Store Section", size: 150 },
		{
			accessorKey: "displaysConnected",
			header: "Displays Connected",
			size: 150,
		},
		{ accessorKey: "lastOnline", header: "Last Online", size: 150 },
		{ accessorKey: "status", header: "Status", size: 100 },
	];

	// แสดงข้อมูลเมื่อโหลดสำเร็จ
	return (
		<div>
			<Table data={data} columns={columns} />
		</div>
	);
};

export default ScreensPage;
