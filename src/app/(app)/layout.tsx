
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Providers from '@/app/providers'
import { BottomNavbar } from "@/components/BottomNavbar";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home / Short Message",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<div className="min-h-screen md:grid md:sm-grid">
						<Sidebar/>
						{children}
						<div className="md:ml-6 md:mr-28 md:mt-5 md:block hidden">
							<input className="input-light mb-2 md:mb-4 p-2 w-full rounded-md" placeholder="Search"/>
						</div>
					</div>
					<BottomNavbar />
				</Providers>
			</body>
		</html>
  );
}
