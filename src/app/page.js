"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component
import Loader2 from "@/components/loader2";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ใช้ next/navigation สำหรับ App Router
import axios from "axios"; // ใช้เรียก api
import Swal from "sweetalert2"; // Import SweetAlert2
import { Suspense } from "react";

const Login = () => {
  const [username, setUsername] = useState(""); // เก็บค่า username
  const [password, setPassword] = useState(""); // เก็บค่า password
  const [showPassword, setShowPassword] = useState(false); // สถานะการแสดงรหัสผ่าน
  const router = useRouter(); //redirect page
  const [isLoading, setIsLoading] = useState(true); //Loading

  // ฟังก์ชันจัดการเมื่อ click submit form
  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("Username:", username);
    // console.log("Password:", password);

    // ตรวจสอบว่า username หรือ password ว่าง
    if (!username || !password) {
      Swal.fire({
        // Library alert warning
        icon: "warning", // Warning icon
        title: "Required all field",
        text: "Please fill in both Username and Password .",
        confirmButtonText: "OK", // Confirmation button
      });
      return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
    } else {
      // สร้าง body สำหรับ request
      // สร้างออบเจ็กต์ data เพื่อเก็บข้อมูล username และ password สำหรับการส่งไปยัง API
      const data = {
        username: username,
        password: password,
      };

      setIsLoading(true); // เปิด Loading
      try {
        // ส่ง Request API Login ด้วย Axios  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          console.log("Logined successfully:", response.data); //แสดงเมื่อ request api สำเร็จ
          localStorage.setItem("user_id", response.data.user.id); //เก็บ access_token ใน localstorage
          localStorage.setItem("access_token", response.data.access_token); //เก็บ access_token ใน localstorage
          localStorage.setItem("username", response.data.user.username); //เก็บ username ใน localstorage
          localStorage.setItem("name", response.data.user.name); //เก็บ name ใน localstorage
          localStorage.setItem("department", response.data.user.department); //เก็บ department ใน localstorage
          localStorage.setItem("position", response.data.user.position); //เก็บ position ใน localstorage
          router.push("/assets"); // เปลี่ยนไปหน้า assets
          setIsLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        } else {
          console.log("Login failed: Try again");
        }
      } catch (error) {
        // console.error(error.response.data);
        // console.error("Error during login:", error.response.data.detail);
        Swal.fire({
          icon: "warning", // Warning icon
          title: "Login failed <br> please try again",
          confirmButtonText: "OK", // Confirmation button
        });
      } finally {
        setIsLoading(false); // ให้หยุด Loading หลังโหลดข้อมูลเสร็จ
        return; // หยุดการทำงานเพิ่มเติมในฟังก์ชันนี้
      }
    } // else
  };

  const handleGoogleLogin = () => {
    // เพิ่มการเชื่อมต่อกับ Google OAuth API
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=58925176098-4s7j4uqgh9h77e1n74af32kt1spfml89.apps.googleusercontent.com&redirect_uri=http://localhost:8000/users/google_signup&response_type=code&scope=email%20profile%20openid&state=12345&prompt=consent";
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false)); // จำลองการโหลดข้อมูล
  }, []);

  if (isLoading) {
    return <Loader2 />;
  }

  return (
    <Suspense fallback={<Loader2 />}>
      <div
        className={`${styles.loginContainer} container-fluid d-flex align-items-center justify-content-center`}
      >
        <div className={`${styles.loginBox} row`}>
          {/* Left side (Login form) */}
          <div
            className={`col-lg-6 col-md-12 bg-white ${styles.paddingHightLogin}`}
          >
            <h2 className="fw-bold text-center">Login</h2>
            <h5 className="pb-4 text-center" style={{ fontSize: "20px" }}>
              OMG Digital Assets Management
            </h5>
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
                    type={showPassword ? "text" : "password"} // เปลี่ยนเป็น text ถ้า showPassword เป็น true
                    className="form-control rounded-pill"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "30px" }} // เพิ่ม padding ด้านขวาเพื่อหลีกเลี่ยงการทับกัน
                  />
                  <span
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)} // สลับสถานะการแสดงรหัสผ่าน
                  >
                    {/* ใช้ Bootstrap Icons */}
                    {showPassword ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`btn  w-100 rounded-pill   ${
                  (styles.loginButton, styles.loginBtn)
                }`}
              >
                Login
              </button>

              {/* Divider */}
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="px-2 text-muted">or</span>
                <hr className="flex-grow-1" />
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                className="btn btn-light w-100 rounded-pill d-flex align-items-center justify-content-center"
                style={{
                  border: "1px solid #ddd",
                  color: "rgb(50 50 50)",
                  fontWeight: "bold",
                  hover: "#fff",
                }}
                onClick={handleGoogleLogin}
              >
                <img
                  src="/google.svg"
                  alt="Google Logo"
                  width="20"
                  height="20"
                  className="me-2"
                />
                Sign in with Google
              </button>
            </form>
          </div>

          {/* Right side (Welcome message) */}
          <div
            className={`${styles.welcomeBox} col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center`}
          >
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
            <h5>Welcome to</h5>
            <h4>Digital Assets Management</h4>
            <p>Don’t have an account?</p>
            <Link
              href="/register"
              className={`${styles.registerButton}  btn btn-outline-light rounded-pill`}
              style={{ width: "30%" }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
