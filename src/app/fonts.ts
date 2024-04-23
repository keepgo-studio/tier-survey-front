import { Lexend_Mega } from "next/font/google"
import localFont from "next/font/local";

 
export const Inter = Lexend_Mega({
  subsets: ['latin'],
  display: 'swap',
})
 
export const Danjo = localFont({
  src: "Danjo-bold-Regular.otf",
  display: 'swap',
})