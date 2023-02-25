import Navbar from "./components/layout/Navbar";
import "./globals.css";
import { Maven_Pro } from "@next/font/google";

const maven_pro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-maven-pro",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={maven_pro.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
