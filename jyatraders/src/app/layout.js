import { Inter } from "next/font/google";
import "./globals.css";
import "../../public/assets/css/bootstrap.min.css"
import "../../public/assets/css/animate.min.css"
import "../../public/assets/css/magnific-popup.css"
import "../../public/assets/css/fontawesome-all.min.css"
import "../../public/assets/css/flaticon.css"
import "../../public/assets/css/odometer.css"
import "../../public/assets/css/jarallax.css"
import "../../public/assets/css/swiper-bundle.min.css"
import "../../public/assets/css/slick.css"
import "../../public/assets/css/aos.css"
import "../../public/assets/css/default.css"
import "../../public/assets/css/style.css"
import "../../public/assets/css/responsive.css"
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
