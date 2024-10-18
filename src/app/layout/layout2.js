"use client";
import React from "react";

const Layout2 = ({ children }) => {
	return (
		<html lang="th">
			<head>
				<title>My Next.js App</title>
			</head>
			<body>
				<header>
					<h1>123456</h1>
					<nav>
						<ul>
							<li>
								<a href="/">555444666</a>
							</li>
							<li>
								<a href="/about">555444222</a>
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

export default Layout2;
