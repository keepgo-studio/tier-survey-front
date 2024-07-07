import { SharedFonts } from "@shared";
import Widget from "@widgets";

export default function Home() {
  return (
    <div className="flex items-center flex-col p-6 w-full h-full justify-evenly">
      <div className={SharedFonts.Danjo.className + " fcenter w-full"}>
        <h1 className="text-6xl md:text-8xl">너희들 티어는</h1>
      </div>

      <Widget.RoleSelect />
    </div>
  );
}
