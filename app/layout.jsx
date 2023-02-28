import Navbar from "./components/layout/Navbar";
import "./globals.css";
import { Maven_Pro } from "@next/font/google";
import QueryWrapper from "./components/providers/QueryWrapper";

const maven_pro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-maven-pro",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={maven_pro.className}>
        <QueryWrapper>
          <Navbar />
          <main className="flex justify-center p-2">{children}</main>
        </QueryWrapper>
      </body>
    </html>
  );
}
