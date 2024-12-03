"use client";

// pages/register.js
import React from 'react';
import { useState,useEffect} from "react";
import Link from 'next/link';
import styles from './profile.module.css';  // css module แยกตาม component
import Image from 'next/image';  // รูปแบบ Next ทำให้โหลดเร็ว
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router
import axios from "axios";  // ใช้เรียก api
import Swal from 'sweetalert2'; // Import SweetAlert2

// import Header from '@/components/header';
import Footer from '@/components/footer';
import Topbar from '@/components/topbar';
import ProtectedRoute from '@/components/protectedRoute';

const Profile = () => {

    // ใช้ useState เก็บข้อมูลจากฟอร์ม
    const [username, setUsername] = useState('rr');
    const [password, setPassword] = useState('rr');
    const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงรหัสผ่าน
    const [name, setName] = useState('rr');
    const [department, setDepartment] = useState('rr');
    const [position, setPosition] = useState('rr');
    const [permission, setPermission] = useState('1');

    //ใช้ redirect page
    const router = useRouter(); 


    const handleSaveChange = (e) => {
        e.preventDefault();

        //เก็บข้อมูลจาก Form รวมเป็น Object
        const ProfileFormObj = { 
        username: username,
        password: password,
        name: name,
        department: department,
        position: position,
        permission: Number(permission)
        };


        // เรียก API ด้วย axios ++++++++++++++++++++++++++++++++++++++++++++++
        axios.post('http://127.0.0.1:8000/users/register', ProfileFormObj, {
        headers: {
            'Content-Type': 'application/json'
        }
        })

        .then((response) => {
        console.log("Registration successful:", response.data);
        router.push('/'); // Redirect ไปหน้า Home
        })
        .catch((error) => {
        console.error("Registration failed:", error.response.data.detail);

        // Alert เตือนเมื่อเกิดข้อผิดพลาดในการ Register เช่น Username ซ้ำ
        Swal.fire({  // Library alert warning
            icon: 'warning', // Warning icon
            title: error.response.data.detail,
            confirmButtonText: 'OK', // Confirmation button
            customClass: {
            title: 'swal2-title',
            content: 'swal2-content',
            confirmButton: 'swal2-confirm',
            },
        });
        });
    };


  return (
    <>
    <ProtectedRoute>
    <Topbar/>
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
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
          <div className='profile-head d-flex justify-content-between align-items-center '>
            <h3 className="mt-3">Profile</h3>  
            <p className='mb-0'>EDIT</p>
          </div>
          
        </div>
        <form onSubmit={handleSaveChange}>
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
            {/* <input 
              type="password" 
              id="password" 
              className="form-control rounded-pill" 
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าของ password
              required 
            /> */}
            <div className="position-relative">
              <input 
                type={showPassword ? 'text' : 'password'}  // เปลี่ยนเป็น text ถ้า showPassword เป็น true
                id="password" 
                className="form-control rounded-pill" 
                placeholder="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} // อัปเดตค่าของ password
                required 
                style={{ paddingRight: '30px' }} // เพิ่ม padding ด้านขวาเพื่อหลีกเลี่ยงการทับกัน
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
          <button type="submit" className={`w-100 mb-2 ${styles.registerBtn}`}>Save change</button>
          <Link href="/assets" className={`btn btn-light w-100  ${styles.backBtn}`} >Back</Link>
        </form>
      </div>
    </div>
    <Footer/>
    </ProtectedRoute>
    </>
  );
}

export default Profile;