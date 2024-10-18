"use client";
import React from "react";

const Layout1 = ({ children }) => {
	return (
		<html lang="th">
			<head>
				<title>My Next.js App</title>
			</head>
			<body>
				<header>
					<h1>My Website</h1>
					<nav>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/about">About</a>
							</li>
						</ul>
					</nav>
				</header>
				<main>{children}</main>
				<footer>
					<p>&copy; 2024 My Website</p>
				</footer>
			</body>
		</html>
	);
};

export default Layout1;
