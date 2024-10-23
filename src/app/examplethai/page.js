"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Table from "@/components/table";
import Loader from "@/components/loader";

const ScreensPage = () => {
	const [data, setData] = useState(null); // สร้าง state สำหรับเก็บข้อมูล screens

	useEffect(() => {
		// จำลองข้อมูลภาษาไทย
		const thaiData = [
			{
				screenId: "001",
				label: "หน้าจอที่ 1",
				storeLocation: "กรุงเทพมหานคร",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-20 10:30",
				status: "ออนไลน์",
			},
			{
				screenId: "002",
				label: "หน้าจอที่ 2",
				storeLocation: "เชียงใหม่",
				storeSection: "ชั้น 2",
				displaysConnected: 3,
				lastOnline: "2024-10-19 14:45",
				status: "ออฟไลน์",
			},
			{
				screenId: "003",
				label: "หน้าจอที่ 3",
				storeLocation: "ขอนแก่น",
				storeSection: "ชั้น 1",
				displaysConnected: 1,
				lastOnline: "2024-10-21 09:00",
				status: "ออนไลน์",
			},
			{
				screenId: "004",
				label: "หน้าจอที่ 4",
				storeLocation: "ภูเก็ต",
				storeSection: "ชั้น 3",
				displaysConnected: 4,
				lastOnline: "2024-10-20 16:10",
				status: "ออฟไลน์",
			},
			{
				screenId: "005",
				label: "หน้าจอที่ 5",
				storeLocation: "สงขลา",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-18 12:20",
				status: "ออนไลน์",
			},
			{
				screenId: "006",
				label: "หน้าจอที่ 6",
				storeLocation: "นครราชสีมา",
				storeSection: "ชั้น 2",
				displaysConnected: 3,
				lastOnline: "2024-10-19 08:30",
				status: "ออนไลน์",
			},
			{
				screenId: "007",
				label: "หน้าจอที่ 7",
				storeLocation: "พิษณุโลก",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-20 11:50",
				status: "ออฟไลน์",
			},
			{
				screenId: "008",
				label: "หน้าจอที่ 8",
				storeLocation: "อุดรธานี",
				storeSection: "ชั้น 3",
				displaysConnected: 5,
				lastOnline: "2024-10-19 17:15",
				status: "ออนไลน์",
			},
			{
				screenId: "009",
				label: "หน้าจอที่ 9",
				storeLocation: "นครสวรรค์",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-21 08:45",
				status: "ออฟไลน์",
			},
			{
				screenId: "010",
				label: "หน้าจอที่ 10",
				storeLocation: "นครปฐม",
				storeSection: "ชั้น 2",
				displaysConnected: 3,
				lastOnline: "2024-10-20 13:00",
				status: "ออนไลน์",
			},
			{
				screenId: "011",
				label: "หน้าจอที่ 11",
				storeLocation: "ระยอง",
				storeSection: "ชั้น 3",
				displaysConnected: 1,
				lastOnline: "2024-10-19 09:30",
				status: "ออนไลน์",
			},
			{
				screenId: "012",
				label: "หน้าจอที่ 12",
				storeLocation: "ชลบุรี",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-21 12:15",
				status: "ออฟไลน์",
			},
			{
				screenId: "013",
				label: "หน้าจอที่ 13",
				storeLocation: "สุราษฎร์ธานี",
				storeSection: "ชั้น 2",
				displaysConnected: 4,
				lastOnline: "2024-10-20 14:30",
				status: "ออนไลน์",
			},
			{
				screenId: "014",
				label: "หน้าจอที่ 14",
				storeLocation: "ประจวบคีรีขันธ์",
				storeSection: "ชั้น 3",
				displaysConnected: 5,
				lastOnline: "2024-10-18 11:00",
				status: "ออฟไลน์",
			},
			{
				screenId: "015",
				label: "หน้าจอที่ 15",
				storeLocation: "อุบลราชธานี",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-21 10:30",
				status: "ออนไลน์",
			},
			{
				screenId: "016",
				label: "หน้าจอที่ 16",
				storeLocation: "ราชบุรี",
				storeSection: "ชั้น 2",
				displaysConnected: 3,
				lastOnline: "2024-10-20 09:45",
				status: "ออนไลน์",
			},
			{
				screenId: "017",
				label: "หน้าจอที่ 17",
				storeLocation: "มหาสารคาม",
				storeSection: "ชั้น 1",
				displaysConnected: 1,
				lastOnline: "2024-10-21 14:00",
				status: "ออฟไลน์",
			},
			{
				screenId: "018",
				label: "หน้าจอที่ 18",
				storeLocation: "ยะลา",
				storeSection: "ชั้น 3",
				displaysConnected: 4,
				lastOnline: "2024-10-19 16:30",
				status: "ออนไลน์",
			},
			{
				screenId: "019",
				label: "หน้าจอที่ 19",
				storeLocation: "เพชรบุรี",
				storeSection: "ชั้น 1",
				displaysConnected: 2,
				lastOnline: "2024-10-21 08:30",
				status: "ออนไลน์",
			},
			{
				screenId: "020",
				label: "หน้าจอที่ 20",
				storeLocation: "ลำพูน",
				storeSection: "ชั้น 2",
				displaysConnected: 3,
				lastOnline: "2024-10-20 12:45",
				status: "ออฟไลน์",
			},
		];

		setData(thaiData); // เซ็ตข้อมูลเมื่อโหลดเสร็จ
	}, []);

	// กรณีข้อมูลยังไม่ถูกโหลด
	if (!data) {
		return <Loader />;
	}

	const columns = [
		{
			accessorKey: "screenId",
			header: "Screen ID",
			size: 150,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
		{
			accessorKey: "label",
			header: "Label",
			size: 200,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
		{
			accessorKey: "storeLocation",
			header: "Store Location",
			size: 200,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
		{
			accessorKey: "storeSection",
			header: "Store Section",
			size: 150,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
		{
			accessorKey: "displaysConnected",
			header: "Displays Connected",
			size: 150,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
		{
			accessorKey: "lastOnline",
			header: "Last Online",
			size: 150,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
		{
			accessorKey: "status",
			header: "Status",
			size: 100,
			sortingFn: (rowA, rowB, columnId) =>
				rowA.original[columnId].localeCompare(rowB.original[columnId], "th"),
		},
	];

	// แสดงข้อมูลเมื่อโหลดสำเร็จ
	return (
		<div>
			<Table data={data} columns={columns} />
		</div>
	);
};

export default ScreensPage;
