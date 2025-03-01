import { cookies } from "next/headers"
import { currentUser} from "@clerk/nextjs/server";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import prisma from '@/lib/prisma';
import React from "react";

export default async function DashboardPage({children}: {children: React.ReactNode;}) {
  
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const user  = await currentUser();
  const domains = user? await prisma.domain.findMany({
    where: {
      user: {
        clerkId: user.id,
      }
    },
    select: {
      id: true,
      name: true,
      icon: true
    }
  })
  : [];

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar domains={domains}/>
    </SidebarProvider>
  );
}
