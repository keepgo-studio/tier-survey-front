import Shared, { Anim } from "@shared";
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

      <ul className="flex flex-col gap-1 text-gray">
        {data.map(({ title, link }) => (
          <li key={title} className="font-light text-xs clickable">
            <Anim.Text>
              <Link href={link} target="_blank">
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

  const sns: ListItem[] = [
    {
      title: "github",
      link: "https://github.com/keepgo-studio/tier-survey-front"
    },
    {
      title: "email",
      link: "mailto:keepgo.studio@gmail.com"
    }
  ];

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
    <footer className="border-t-[0.5px] border-border">
      <div className="flex justify-between p-8">
        <section>
          <Shared.Frame className="p-4">
            <Image src="/favicon.png" alt="logo" width={42} height={42} />
          </Shared.Frame>
        </section>

        <section className="w-full flex items-center justify-end gap-8">
          <ListSection title="Contact" data={sns} />
          
          <div className="w-[1px] h-4 bg-white"/>

          <ListSection title="Resources" data={resources} />
        </section>
      </div>

      <p className="m-auto max-w-7xl p-4 text-xs text-gray text-center font-light">
        <Link className="font-bold" href="/">{appName}</Link> is not endorsed by Riot Games and does not reflect the views
        or opinions of Riot Games or anyone officially involved in producing or
        managing Riot Games properties. Riot Games and all associated properties
        are trademarks or registered trademarks of Riot Games, Inc
      </p>
    </footer>
  );
}
