"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Table from "@/components/table";
import Loader from "@/components/loader";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from 'next/link';

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
		<div className={`loginContainer container-fluid d-flex align-items-center justify-content-center`}>
			<div className={`loginBox row`}>
			{/* Left side (Login form) */}
			<div className="col-lg-6 col-md-12 p-5">
				<h2>Login</h2>
				<form>
				<div className="mb-4">
					<label className="form-label">Username</label>
					<input type="text" className="form-control" placeholder="username" />
				</div>
				<div className="mb-4">
					<label className="form-label">Password</label>
					<input type="password" className="form-control" placeholder="password" />
				</div>
				<button type="submit" className={`btn btn-primary w-100 loginButton`}>Login</button>
				</form>
			</div>
	
			{/* Right side (Welcome message) */}
			<div className={`welcomeBox col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center`}>
				<div className={`mb-4 logo`}>Logo</div>
				<h3>Welcome to Login</h3>
				<p>Don’t have an account?</p>
				<Link href="#" className="registerButton  btn btn-outline-light">
				   Register
				</Link>
			</div>
			</div>
	  	</div>
	);
};

export default ScreensPage;
