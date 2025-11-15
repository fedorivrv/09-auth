import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import { IMG_URL, SITE_URL } from "@/lib/constants";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub is a simple and powerful platform for creating, organizing, and sharing notes. Write, edit, and access your ideas anytime, anywhere.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub helps you capture and organize your ideas with ease.Secure storage, fast access, and a clean interface for better productivity.",
    url: SITE_URL,

    images: [
      {
        url: IMG_URL,
        width: 1200,
        height: 630,
        alt: "NoteHub — online note-taking app",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
      >
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}