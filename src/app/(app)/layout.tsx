
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Providers from '@/app/providers'
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
						<Sidebar css="justify-self-end"/>
						{children}
					</div>
				</Providers>
			</body>
		</html>
  );
}
