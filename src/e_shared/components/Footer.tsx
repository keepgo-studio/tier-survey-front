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
      <h4 className="text-lg">{title}</h4>
      <ul>
        {data.map(({ title, link }) => (
          <li key={title}>
            <Link href={link} className="font-bold text-gray-400 text-sm">
            {title}
            </Link>
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
    <div className="px-2 py-6 border-t">
      <section className="flex items-center justify-between p-6">
        <Image src="/favicon.png" alt="logo" width={80} height={80} />

        <ListSection title="Resources" data={resources} />
      </section>

      <hr />

      <p className="p-6">
        {appName} is not endorsed by Riot Games and does not reflect the views
        or opinions of Riot Games or anyone officially involved in producing or
        managing Riot Games properties. Riot Games and all associated properties
        are trademarks or registered trademarks of Riot Games, Inc
      </p>
    </div>
  );
}
