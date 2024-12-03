"use client"

import React from 'react'
import { useEffect } from "react";
import { useRouter ,useSearchParams } from 'next/navigation';  // ใช้สำหรับอ่าน query string get tokten
import Loader2 from '@/components/loader2';

function Monitortoken() {
    const searchParams = useSearchParams(); // ใช้สำหรับอ่าน query string
    const router = useRouter(); // ใช้สำหรับการนำทาง
    const token = searchParams.get('token'); // รับค่า 'token' จาก URL


    const validateToken = (token) => {
        try {
            const decoded = jwt_decode(token); // ถอดรหัส (decode) token เพื่อดึงข้อมูล payload ออกมา
            if (!decoded.exp) {  // ตรวจสอบว่ามีฟิลด์ exp (expiration time) ใน payload หรือไม่
                // console.error("Token missing expiration (exp) field"); // ถ้าไม่มีให้แสดงข้อผิดพลาด
                return false; // คืนค่า false เพื่อบอกว่า token ไม่ถูกต้อง
            }
        
            const currentTime = Math.floor(Date.now() / 1000);  // ได้เวลาปัจจุบันในรูปแบบ timestamp (หน่วยเป็นวินาที)
            return decoded.exp > currentTime;  // เปรียบเทียบเวลาหมดอายุของ token กับเวลาปัจจุบัน  ถ้า exp มากกว่าเวลาปัจจุบัน แสดงว่า token ยังไม่หมดอายุ คืนค่า true
            
        } catch (error) {
            // หากเกิดข้อผิดพลาดขณะถอดรหัส token
            // console.error("Invalid token format or decoding failed"); 
            // แสดงข้อความว่า token ไม่ถูกต้องหรือถอดรหัสล้มเหลว
            return false; // คืนค่า false เพื่อบอกว่า token ไม่ถูกต้อง
        }
        
    };


    useEffect(() => {
        console.log('token : '+ token) // Debug get tokten
        
			if (token && validateToken(token)) {
				localStorage.setItem('access_token', token); // เก็บ token ใน localStorage
                router.replace("/monitortoken"); // ลบ token จาก URL
				// console.log('Token saved:', token); // Debug
				router.push('/assets'); // เปลี่ยนไปหน้า assets
                      
			}else{
                router.push('/'); // เปลี่ยนไปหน้า assets
            }
    })


  return (
    <div>
        <Loader2/>
    </div>
  )
}

export default Monitortoken