import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import UserPosts from "../components/dashboard/UserPosts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <section className="section-container w-full px-2 md:w-2/3 lg:w-1/2 xl:w-2/5">
      <h1 className="text-xl font-bold">Bienvenido {session?.user?.name}</h1>
      <UserPosts />
    </section>
  );
}
