import { cookies } from "next/headers"
import { auth, redirectToSignIn } from "@clerk/nextjs/server";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function DashboardPage() {
  const { userId } = await auth();
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  if (!userId) {
    return redirectToSignIn({ returnBackUrl: "/dashboard" });
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
    </SidebarProvider>
  );
}
