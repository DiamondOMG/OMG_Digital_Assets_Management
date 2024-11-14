"use client";

// pages/register.js
import React from 'react';
import { useState} from "react";
import Link from 'next/link';
import styles from './register.module.css';  // css module แยกตาม component
import Image from 'next/image';  // รูปแบบ Next ทำให้โหลดเร็ว
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router

const Register = () => {

    // ใช้ useState เก็บข้อมูลจากฟอร์ม
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [bu, setBu] = useState('');
    const [position, setPosition] = useState('');

    const router = useRouter(); //ใช้ redirect page


  const handleRegister = (e) => {
    e.preventDefault();
        // Logic สำหรับการสมัครใช้งาน
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Name:", name);
        console.log("BU:", bu);
        console.log("Position:", position);
        console.log("Register success");
        router.push('/'); // redirect to Home page
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
            <label htmlFor="bu" className="form-label">BU</label>
            <input 
              type="text" 
              id="bu" 
              className="form-control rounded-pill" 
              placeholder="bu" 
              value={bu} 
              onChange={(e) => setBu(e.target.value)} // อัปเดตค่าของ bu
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