import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LoginButton from "./LoginButton";
import UserProfileMenu from "./UserProfileMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex h-[48px] items-center justify-between bg-gray-900 px-4 lg:h-[56px] lg:px-6 xl:h-[64px] xl:px-8">
      <Link href={"/"} className="text-white">
        <h1 className="text-xl font-extrabold">Post It</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <LoginButton />}
        {session?.user && <UserProfileMenu image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
