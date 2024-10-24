
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Providers from '@/app/providers'
import { Navbar } from "@/components/Navbar";
import { BottomNavbar } from "@/components/BottomNavbar";

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
					<Navbar css={null} />
					<div className="min-h-screen md:grid md:sm-grid">
						{children}
					</div>
					<BottomNavbar />
				</Providers>
			</body>
		</html>
  );
}
