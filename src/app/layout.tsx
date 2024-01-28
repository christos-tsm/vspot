import React from "react";
import NextTopLoader from 'nextjs-toploader';
import '@/theme-styles/global.scss';
import type {Metadata} from "next";
import {Manrope} from "next/font/google";
import Navigation from "@/components/navigation";

const inter = Manrope({subsets: ["latin", "greek"]});

export const metadata: Metadata = {
    title: "vSpot - All about Volos",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="el">
        <body className={inter.className}>
        <NextTopLoader
            color="#4c9aff"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={400}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            zIndex={1600}
            showAtBottom={false}
        />
        <Navigation/>
        {children}
        </body>
        </html>
    );
}
