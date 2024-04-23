import { Anim } from "@shared";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ListItem = {
  title: string;
  link: string;
};

const ListSection = ({ 
  title, 
  data 
}: { 
  title: string;
  data: ListItem[];
}) => {
  return (
    <section>
      <h4 className="text-base">{title}</h4>

      <div className="h-2"/>

      <ul className="flex flex-col gap-1 text-prime-gray">
        {data.map(({ title, link }) => (
          <li key={title} className="font-light text-gray-400 text-xs">
            <Anim.Text>
              <Link href={link}>
              {title}
              </Link>
            </Anim.Text>
          </li>
        ))}
      </ul>
    </section>
  )
};

export default function Footer() {
  const appName = "Tier Survey";

  const resources: ListItem[] = [
    {
      title: "privacy",
      link: "/rso/privacy"
    },
    {
      title: "terms of service",
      link: "/rso/tos"
    },
  ];

  return (
    <footer>
    <div className="flex justify-between p-6 border-t border-prime-deep-dark">
      <section>
        <Image src="/favicon.png" alt="logo" width={60} height={60} />
      </section>

      <section className="w-full flex justify-end">
        <ListSection title="Resources" data={resources} />
      </section>
    </div>
    <p className="p-4 text-[10px] text-prime-gray">
      <Link className="font-bold" href="/">{appName}</Link> is not endorsed by Riot Games and does not reflect the views
      or opinions of Riot Games or anyone officially involved in producing or
      managing Riot Games properties. Riot Games and all associated properties
      are trademarks or registered trademarks of Riot Games, Inc
    </p>
    </footer>
  );
}
