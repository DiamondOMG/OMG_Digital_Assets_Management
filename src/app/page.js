"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import styles from './page.module.css'
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
	const [username, setUsername] = useState(''); // เก็บค่า username
	const [password, setPassword] = useState(''); // เก็บค่า password

	useEffect(() => {

	}, []); // ใช้ useEffect โดยมี dependency เป็น array ว่าง เพื่อให้ดึงข้อมูลแค่ครั้งเดียวตอน mount

	  // ฟังก์ชันจัดการเมื่อกด submit ฟอร์ม
	  const handleLogin = (e) => {
		e.preventDefault();
		console.log("Username:", username);
		console.log("Password:", password);
	  };

	return (
		<div className={`${styles.loginContainer} container-fluid d-flex align-items-center justify-content-center`}>
			<div className={`${styles.loginBox} row`}>
			{/* Left side (Login form) */}
			<div className={`col-lg-6 col-md-12 bg-white ${styles.paddingHightLogin}`}>
				<h2 className="fw-bold text-center">Login</h2>
				<h5 className="pb-4 text-center" style={{fontSize:'20px'}}>OMG Digital Assets Management</h5>
				<form onSubmit={handleLogin}>
				<div className="mb-4">
					<label className="form-label">Username</label>
					<input 
						type="text" 
						className="form-control rounded-pill" 
						placeholder="username"   
						value={username}  
						onChange={(e) => setUsername(e.target.value)} // อัปเดตค่า username
					/>

				</div>
				<div className="mb-4">
					<label className="form-label">Password</label>
					<input 
						type="password" 
						className="form-control rounded-pill" 
						placeholder="password" 
						value={password} 
						onChange={(e) => setPassword(e.target.value)} // อัปเดตค่า password
					/>
				</div>
				<button type="submit" className={`btn  w-100 rounded-pill   ${styles.loginButton, styles.loginBtn}`}>Login</button>
				</form>
			</div>
	
			{/* Right side (Welcome message) */}
			<div className={`${styles.welcomeBox} col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center`}>
				<div className={`mb-4 ${styles.logo}`}>
				<Image 
					src="/logo-actmedia-header.png" 
					alt="Logo Actmedia Thailand"
					className="img-fluid p-2" 
					width={500} 
					height={300}
					layout="responsive" // ใช้ layout แบบ responsive
					priority // ใช้ priority เพื่อ preload ภาพ
				/>
				</div>
				<h3>Welcome to Login</h3>
				<p>Don’t have an account?</p>
				<Link href="#" className={`${styles.registerButton}  btn btn-outline-light rounded-pill`} style={{width:'30%'}}>
				   Register
				</Link>
			</div>
			</div>
	  	</div>
	);
};

export default Login;
