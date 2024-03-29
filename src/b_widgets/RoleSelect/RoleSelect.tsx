import Shared from "@shared";
import Link from "next/link";
import React from "react";

export default function RoleSelect() {
  return (
    <ul className="flex">
      <li>
        <Link href="/host">
          <Shared.Container>Host</Shared.Container>
        </Link>
      </li>
      <li>
        <Link href="/participant">
          <Shared.Container>Participant</Shared.Container>
        </Link>
      </li>
    </ul>
  );
}
