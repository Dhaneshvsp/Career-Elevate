// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerElevate",
  description: "Mock interviews, resumes, and career tools tailored for you.",
  openGraph: {
    title: "CareerElevate",
    description: "Your all-in-one platform for interview preparation and career growth.",
    url: "https://careerelevate.vercel.app/logo.svg",
    siteName: "CareerElevate",
    images: [
      {
        url: "https://careerelevate.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: "CareerElevate Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerElevate",
    description: "Ace your interviews and level up your career.",
    creator: "@careerelevate",
    images: ["https://careerelevate.vercel.app/logo.svg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <title>CareerElevate</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
