import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Logout from "./components/Logout";
import {cookies} from "next/headers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Clinic Information System",
	description:
		"A private clinic information system that is used by clinic employees to manage patients records with medical prescription",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	const auth = cookies().get("pb_auth");
	return (
		<html lang="en">
			<body className={inter.className + " !px-6 lg:!px-32 min-w-full"}>
				<nav className="w-full flex justify-between py-4 items-center mb-8">
					<h1 className="text-lg font-bold">Clinic Information System</h1>
					{auth ? <Logout></Logout> : null}
				</nav>
				{children}
			</body>
		</html>
	);
}
