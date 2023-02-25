"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Button from "../elements/Button";

type ComponentProps = {
  image: string;
};

export default function UserProfileMenu({ image = "" }: ComponentProps) {
  return (
    <li className="flex items-center gap-4 md:gap-6 lg:gap-8">
      <Button
        onClickHandler={signOut}
        classes="text-md bg-secondary-500 text-white hover:bg-secondary-250 disabled:opacity-25"
      >
        Salir
      </Button>
      <Link href="/dashboard">
        <Image
          alt="User avatar"
          className="w-9 rounded-full"
          height={48}
          priority
          src={image}
          width={48}
        />
      </Link>
    </li>
  );
}
