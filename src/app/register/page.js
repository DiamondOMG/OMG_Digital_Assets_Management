"use client";

// pages/register.js
import React from 'react';
import { useState,useEffect} from "react";
import Link from 'next/link';
import styles from './register.module.css';  // css module แยกตาม component
import Image from 'next/image';  // รูปแบบ Next ทำให้โหลดเร็ว
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from "axios";  // ใช้เรียก api

const Register = () => {

    // ใช้ useState เก็บข้อมูลจากฟอร์ม
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [permission, setPermission] = useState('1');

    //ใช้ redirect page
    const router = useRouter(); 


  const handleRegister = (e) => {
    e.preventDefault();

    const requestData = {
      username: username,
      password: password,
      name: name,
      department: department,
      position: position,
      permission: permission
    };
    // console.log(requestData);

        // Logic สำหรับการสมัครใช้งาน
        // console.log("Username:", username);
        // console.log("Password:", password);
        // console.log("Name:", name);
        // console.log("DEPARTMENT:", department);
        // console.log("Position:", position);

        // เรียก API ด้วย axios
        axios.post('http://127.0.0.1:8000/users/register', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            console.log("Registration successful:", response.data);
            // router.push('/'); // Redirect ไปหน้า Home
          })
          .catch((error) => {
            console.error("Registration failed:", error);
            // จัดการข้อผิดพลาดที่เกิดขึ้น เช่น แสดงข้อความเตือน
          });


          // router.push('/'); // redirect to Home page
          console.log("Register success");

  };




  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4" style={{ width: '400px' }}>
        <div className="text-center mb-4">
        <div className={`rounded-circle mx-auto d-flex align-items-center ${styles.boxLogoRegister}`} style={{ width: '130px', height: '130px'}}>
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
          <h3 className="mt-3">Register</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              id="username" 
              className="form-control rounded-pill" 
              placeholder="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} // อัปเดตค่าของ username
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control rounded-pill" 
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าของ password
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-control rounded-pill" 
              placeholder="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} // อัปเดตค่าของ name
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input 
              type="text" 
              id="department" 
              className="form-control rounded-pill" 
              placeholder="department" 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)} // อัปเดตค่าของ bu
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="form-label">Position</label>
            <input 
              type="text" 
              id="position" 
              className="form-control rounded-pill" 
              placeholder="position" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} // อัปเดตค่าของ position
              required 
            />
          </div>
          <button type="submit" className={`w-100 mb-2 ${styles.registerBtn}`}>Register now</button>
          <Link href="/" className={`btn btn-light w-100  ${styles.backBtn}`} >Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;