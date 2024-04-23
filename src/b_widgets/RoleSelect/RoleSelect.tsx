import React from "react";
import Shared from "@shared";
import Link from "next/link";

export default function RoleSelect() {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href="/host">
          <Shared.Container className="w-[300px] h-[300px] flex flex-col items-center justify-evenly">
            <h2 className="text-xl">Open survey</h2>
            <svg className="fill-prime-purple" width="120px" height="120px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path fill="none" d="M0 0H24V24H0z"/>
                    <path d="M21 3c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H6.455L2 22.5V4c0-.552.448-1 1-1h18zm-8 4h-2v8h2V7zm4 2h-2v6h2V9zm-8 2H7v4h2v-4z"/>
                </g>
            </svg>
          </Shared.Container>
        </Link>
      </li>
      <li>
        <Link href="/participant">
          <Shared.Container className="w-[300px] h-[300px] flex flex-col items-center justify-evenly">
            <h2 className="text-xl">Joined survey</h2>

            <svg className="fill-prime-white" width="120px" height="120px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 19 3.29 20.93 5.56 21.66C6.22 21.89 6.98 22 7.81 22H16.19C17.02 22 17.78 21.89 18.44 21.66C20.71 20.93 22 19 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.5 16.19C20.5 18.33 19.66 19.68 17.97 20.24C17 18.33 14.7 16.97 12 16.97C9.3 16.97 7.01 18.32 6.03 20.24H6.02C4.35 19.7 3.5 18.34 3.5 16.2V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V16.19Z" />
              <path d="M12.0019 8C10.0219 8 8.42188 9.6 8.42188 11.58C8.42188 13.56 10.0219 15.17 12.0019 15.17C13.9819 15.17 15.5819 13.56 15.5819 11.58C15.5819 9.6 13.9819 8 12.0019 8Z"/>
            </svg>
          </Shared.Container>
        </Link>
      </li>
    </ul>
  );
}
