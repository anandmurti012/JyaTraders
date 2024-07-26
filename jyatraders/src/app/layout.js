import { Inter } from "next/font/google";
import "./globals.css";

import "../assets/css/bootstrap.min.css"
import "../assets/css/animate.min.css"
import "../assets/css/magnific-popup.css"
import "../assets/css/fontawesome-all.min.css"
import "../assets/css/flaticon.css"
import "../assets/css/odometer.css"
import "../assets/css/jarallax.css"
import "../assets/css/swiper-bundle.min.css"
import "../assets/css/slick.css"
import "../assets/css/aos.css"
import "../assets/css/default.css"
import "../assets/css/style.css"
import "../assets/css/responsive.css"



import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jya Trades - Your Trusted Partner in Financial Growth",
  description: "At Jya Trades, we are committed to helping you achieve financial success. Explore our expert trading advice, innovative financial strategies, and personalized services tailored to your unique needs.",
  keywords: "Jya Trades, financial growth, trading advice, investment strategies, personalized financial services",
  author: "Jya Trades Team",
  charset: "UTF-8",
  robots: "index, follow",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
