import { Lexend_Mega } from "next/font/google"
import localFont from "next/font/local";

 
export const inter = Lexend_Mega({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = localFont({
  src: "Danjo-bold-Regular.otf",
  display: 'swap',
})