import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; 
import SignUpClient from "./sign-up-client"; 

export default async function SignUpPage() {
  const { userId } = await auth(); 

  if (userId) {
    return redirect("/dashboard"); 
  }

  return <SignUpClient />;
}
