import Shared, { SharedFonts } from "@shared";
import Image from "next/image";
import { MdInsertChart } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import Link from "next/link";

function TextSection() {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-7xl font-bold">너의 티어는,</h1>

      <div className="h-6"/>

      <div className="text-3xl font-bold text-bright-gray leading-normal">
        <span>방송에서,</span> 함께
        <br/>
        서로의 티어를 공유해보아요
      </div>

      <div className="h-6"/>

      <Link href={"/host"}>
        <Shared.Button className="bg-purple">
          설문 시작하기
        </Shared.Button>
      </Link>
    </div>
  )
}

function ButtonSection() {
  const items = [
    {
      icon: <MdInsertChart className="text-2xl" />,
      text: "열었던 설문 확인하기",
      href: "/host/survey"
    },
    {
      icon: <BsPersonWorkspace className="text-2xl" />,
      text: "참가했던 설문 확인하기",
      href: "/participant"
    },
  ];

  return (
    <div>
      <div className="relative w-36 md:w-72 aspect-square m-auto md:m-0">
        <Image src={"/people.png"} fill alt="people" className="object-contain"/>
      </div>

      <Shared.Frame type="large" className="!px-4 !py-6 flex flex-col gap-4">
        {items.map(_item => (
          <Link key={_item.href} href={_item.href} className="clickable">
            <Shared.Frame  className="flex items-center gap-4 px-4 py-3">
              <Shared.Frame type="small" className="fcenter w-10 h-10">
                {_item.icon}
              </Shared.Frame>
              <span className="font-bold text-lg">{_item.text}</span>
            </Shared.Frame>
          </Link>
        ))}
      </Shared.Frame>
    </div>
  )
}

export default function Home() {
  return (
    <section className={"flex-1 fcenter" + " " + SharedFonts.Jua.className}>
      <div className="p-8 max-w-5xl flex flex-col gap-12 items-center justify-between w-full md:flex-row md:gap-0">
        <TextSection />    
        <ButtonSection />
      </div>
    </section>
  );
}
