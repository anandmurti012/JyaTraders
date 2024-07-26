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
import Head from 'next/head'



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
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
