
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from './providers'
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home / Short Message",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<div className="min-h-screen flex justify-center">
						<Sidebar />
						{children}
					</div>
				</Providers>
			</body>
		</html>
  );
}
