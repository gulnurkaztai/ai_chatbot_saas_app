import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();
  
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Button>YOOOO</Button>
    </div>
  );
}
