"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component
import Loader2 from "@/components/loader2";

import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import styles from './page.module.css'
import Link from 'next/link'; 
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from 'axios';  // ใช้เรียก api
import Swal from 'sweetalert2'; // Import SweetAlert2


const Login = () => {
	const [username, setUsername] = useState(''); // เก็บค่า username
	const [password, setPassword] = useState(''); // เก็บค่า password
	const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงรหัสผ่าน
	const router = useRouter(); //redirect page
	const [isLoading, setIsLoading] = useState(true);  //Loading 

		// ฟังก์ชันจัดการเมื่อกด submit ฟอร์ม
		const handleLogin = async (e) => {
			e.preventDefault();
			console.log("Username:", username);
			console.log("Password:", password);

			  // ตรวจสอบว่า username หรือ password ว่าง
			if (!username || !password) {
				Swal.fire({  // Library alert warning
					icon: 'warning', // Warning icon
					title: 'Required all field',
					text: 'Please fill in both Username and Password .',
					confirmButtonText: 'OK', // Confirmation button
				});
				return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
			}
		
			// สร้าง body สำหรับ request
			const data = {
			  username: username,
			  password: password,
			};
		
			// ส่ง API ด้วย Axios
				try {
				const response = await axios.post('http://127.0.0.1:8000/users/login', data, {
					headers: {
					'Content-Type': 'application/json',
					},
				});
			
				if (response.data) {
					console.log("Logined successfully:", response.data);
					// console.log( response.data.access_token);
					localStorage.setItem("access_token", response.data.access_token); //เก็บ access_token ใน localstorage
					localStorage.setItem("username", response.data.user.username); //เก็บ username ใน localstorage
					localStorage.setItem("name", response.data.user.name); //เก็บ name ใน localstorage
					localStorage.setItem("department", response.data.user.department); //เก็บ department ใน localstorage
					localStorage.setItem("position", response.data.user.position); //เก็บ position ใน localstorage
					router.push('/assets'); // เปลี่ยนไปหน้า assets
				} else {
					console.log("Login failed: Try again");
				}
				} catch (error) {
					// console.error(error.response.data);
					console.error("Error during login:", error.response.data.detail);
					Swal.fire({
						icon: 'warning', // Warning icon
						title: 'Login failed <br> please try again',
						confirmButtonText: 'OK', // Confirmation button
					});
				}
		};

		useEffect(() => {
			setTimeout(() => setIsLoading(false)); // จำลองการโหลดข้อมูล
		}, []);

		if (isLoading) {
			return (
				<Loader2/>
			);
		}
		  

		


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
					<div className="position-relative">
						<input 
							type={showPassword ? 'text' : 'password'}  // เปลี่ยนเป็น text ถ้า showPassword เป็น true
							className="form-control rounded-pill" 
							placeholder="password" 
							value={password} 
							onChange={(e) => setPassword(e.target.value)} 
						/>
						<span 
							className="position-absolute" 
							style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
							onClick={() => setShowPassword(!showPassword)}  // สลับสถานะการแสดงรหัสผ่าน 
						>
								{/* ใช้ Bootstrap Icons */}
								{showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
						</span>
					</div>
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
				<Link href="/register" className={`${styles.registerButton}  btn btn-outline-light rounded-pill`} style={{width:'30%'}}>
				   Register
				</Link>
			</div>
			</div>
	  	</div>
	);
};

export default Login;
