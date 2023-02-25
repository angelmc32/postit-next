"use client";

import { signIn } from "next-auth/react";
import Button from "../elements/Button";

export default function LoginButton() {
  return (
    <li className="list-none">
      <Button
        onClickHandler={signIn}
        classes="text-md bg-secondary-500 text-white hover:bg-secondary-250 disabled:opacity-25"
      >
        Ingresar
      </Button>
    </li>
  );
}
