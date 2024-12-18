
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Providers from '@/app/providers'
import { BottomNavbar } from "@/components/BottomNavbar";
import { RPanel } from "@/components/RPanel";
import Link from "next/link";

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
						<div className="fixed top-0 left-0 bg-sm-white z-[1] max-sm:hidden flex items-center md:my-4">
							<Link prefetch={false} className="font-bold self-center md:ml-5 text-sm-primary-dark" href="/">Short Message</Link>
						</div>
						{children}
						<RPanel/>
					</div>
					
					<BottomNavbar />
				</Providers>
			</body>
		</html>
  );
}
