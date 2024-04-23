import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req: Request) {
  const cookieStore = cookies();

  cookieStore.delete('hashed-id');

  return new Response("logout success", {
    status: 200
  });
}