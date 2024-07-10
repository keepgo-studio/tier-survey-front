import { Inter as In, Lexend_Mega, Nanum_Gothic } from "next/font/google"
import localFont from "next/font/local";
 
export const LexendMega = Lexend_Mega({
  subsets: ['latin'],
  display: 'swap',
})
 
export const Danjo = localFont({
  src: "Danjo-bold-Regular.otf",
  display: 'swap',
})

export const Jua = Nanum_Gothic({
  subsets: ['latin'],
  weight: ["400", "700", "800"],
})

export const Inter = In({
  subsets: ['latin'],
})