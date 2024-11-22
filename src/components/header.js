"use client";

import React, { useState, useEffect, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import './style/header.css';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation สำหรับ App Router

const Header = () => {
    const [showAccount, setShowAccount] = useState(false);
    const [showLeftSidebar, setShowLeftSidebar] = useState(true); // Left sidebar visibility
    const [showRightSidebar, setShowRightSidebar] = useState(true); // Right sidebar visibility
    const dropdownRef = useRef(null);

    const toggleAccount = () => setShowAccount((prev) => !prev);
    const toggleLeftSidebar = () => setShowLeftSidebar((prev) => !prev);
    const toggleRightSidebar = () => setShowRightSidebar((prev) => !prev);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowAccount(false);
        }
    };

    const router = useRouter();   // คำสั่งสำหรับ redirect page   
    const handleLogout = () => {
        // ลบข้อมูลทั้งหมดใน localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        localStorage.removeItem("department");
        localStorage.removeItem("position");
    
        // เปลี่ยนเส้นทางกลับไป login
         router.push('/');
    };

    useEffect(() => {
        if (showAccount) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAccount]);

    return (
        <div>
            {/* Navbar */}
            <Navbar expand="lg" style={{ backgroundColor: "#39CAFF", color: "white" }}>
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="/home" style={{ color: "#081E26", fontWeight: "500" }}>
                        <i className="bi bi-display pe-3"></i> OMG Digital - Asset Management
                    </Navbar.Brand>
                    <div className="d-flex gap-3 align-items-center">
                        <button onClick={toggleLeftSidebar} className="btn btn-link">
                            <i className="bi bi-list" style={{ fontSize: "20px", color: "#0F68A2" }} />
                        </button>
                        <Link href="#">
                            <div className="boxIconHead">
                                <i className="bi bi-share" style={{ fontSize: "20px", color: "#0F68A2" }} />
                            </div>
                        </Link>
                        <Link href="#">
                            <div className="boxIconHead">
                                <i className="bi bi-bell" style={{ fontSize: "20px", color: "#0F68A2" }} />
                            </div>
                        </Link>
                        <div className="position-relative" ref={dropdownRef}>
                            <div className="boxIconHead" onClick={toggleAccount} style={{ cursor: "pointer" }}>
                                <i className="bi bi-person" style={{ fontSize: "20px", color: "#0F68A2" }} />
                            </div>
                            {showAccount && (
                                <div
                                    className="dropdown-menu dropdown-menu-end"
                                    style={{
                                        display: "block",
                                        position: "absolute",
                                        top: "38px",
                                        right: "0",
                                        backgroundColor: "white",
                                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <Link href="#" className="dropdown-item"><i className="bi bi-person"></i> Profile</Link>
                                    <Link href="#" className="dropdown-item"><i className="bi bi-person-check"></i> Permission</Link>
                                    <Link href="/" className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Logout</Link>
                                </div>
                            )}
                        </div>
                        <button onClick={toggleRightSidebar} className="btn btn-link">
                            <i className="bi bi-funnel" style={{ fontSize: "20px", color: "#0F68A2" }} /> {/* Filter Icon */}
                        </button>
                    </div>
                </Container>
            </Navbar>

            

            {/* Main Content Area */}
            <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
                {/* Left Sidebar */}
                {showLeftSidebar && (
                    <div style={{
                        width: "250px",
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderRight: "1px solid #ddd",
                        overflowY: "auto"
                    }}>
                        <input type="text" placeholder="Find a view" style={{ width: "100%", marginBottom: "15px" }} />
                        <div>
                            <h5>My views</h5>
                            <p><Link href="#">Overview</Link></p>
                            <p><Link href="#">Menu Label</Link></p>
                            <p><Link href="#">Menu Label</Link></p>
                        </div>
                        <div>
                            <h5>All views</h5>
                            <p><Link href="#">Overview</Link></p>
                            <p><Link href="#">Menu Label</Link></p>
                            <p><Link href="#">Menu Label</Link></p>
                        </div>
                    </div>
                )}

                {/* Main Table Area */}
                <div style={{
                    flexGrow: 1,
                    padding: "20px",
                    overflowY: "auto",
                    transition: "margin 0.3s",
                    marginLeft: showLeftSidebar ? "0" : "-250px",
                    marginRight: showRightSidebar ? "250px" : "0"
                }}>
                    <div style={{ border: "1px solid #007bff", padding: "20px", textAlign: "center", fontSize: "24px" }}>
                        Table
                    </div>
                </div>

                {/* Right Sidebar */}
                {showRightSidebar && (
                    <div style={{
                        width: "250px",
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderLeft: "1px solid #ddd",
                        overflowY: "auto"
                    }}>
                        <h5>Filter by Select</h5>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
                                <span>Filter by Select</span>
                                <button className="btn-close" style={{ fontSize: "12px" }}></button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
 