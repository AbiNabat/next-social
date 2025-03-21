import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import {ClerkLoading, ClerkProvider} from "@clerk/nextjs";
import Loader from "@/components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Social media app",
  description: "X-clone application",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ClerkLoading>
          <Loader/>
      </ClerkLoading>
      <div className='flex justify-between max-w-6xl mx-auto'>
          <div className='hidden sm:inline border-r h-screen sticky top-0'><LeftSidebar/></div>

          <div className='w-2xl flex-1'>
              {children}
          </div>
          <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'><RightSidebar/></div>
      </div>

      </body>
    </html>
      </ClerkProvider>
  );
}
