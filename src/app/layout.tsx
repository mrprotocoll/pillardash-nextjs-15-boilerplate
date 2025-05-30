import type { Metadata } from "next";
import { Mulish } from "next/font/google";

import AppWrapper from "@/components/layouts/AppWrapper";
import { siteMetadata } from "@/lib/metadata";
import "@/styles/globals.css";

const mulish = Mulish({
    variable: "--font-mulish-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${mulish.variable} `}>
                <AppWrapper>{children}</AppWrapper>
            </body>
        </html>
    );
}
