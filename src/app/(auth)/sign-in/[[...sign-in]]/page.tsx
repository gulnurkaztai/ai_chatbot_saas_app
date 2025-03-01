import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; 
import SignInClient from "./sign-in-client"; 

export default async function SignInPage() {
  const { userId } = await auth(); 

  if (userId) {
    return redirect("/dashboard"); 
  }

  return <SignInClient />;
}
