import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Starfield from "./starfield";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mr. Bot",
  description: "Mr. Bot… will you expose the truth… or… become it?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <link rel="icon" href="/favicon.png" type="image/png" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>  <audio src="comf.mp3" autoPlay loop></audio>

        <Starfield/>
        {children}
      </body>
    </html>
  );
}
