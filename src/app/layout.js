// import localFont from "next/font/local";
import "./globals.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";


// const geistSans = localFont({
// 	src: "./fonts/GeistVF.woff",
// 	variable: "--font-geist-sans",
// 	weight: "100 900",
// });
// const geistMono = localFont({
// 	src: "./fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

export const metadata = {
	title: "OMG Digital Assets Management",
	description: "OMG Digital Assets Management",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			
			<body >
				{children}
			</body>
		</html>
	);
}
