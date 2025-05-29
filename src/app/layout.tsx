import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import TarefasProvider from "@/context/TarefasProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TarefasWeb",
	description: "Aplicativo Web tarefas com router e context",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<TarefasProvider>
					<div className="min-h-screen bg-gray-50">
						<Navbar />
						<main className="container mx-auto p-4">{children}</main>
					</div>
				</TarefasProvider>
			</body>
		</html>
	);
};

export default RootLayout;
