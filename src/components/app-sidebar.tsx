"use client";
import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Settings2,
  LogOut,
  Mail,
  MessageCircleMore,
  MonitorSmartphone,
  ChevronLeft,
  Plus,
} from "lucide-react";

import { SignOutButton } from "@clerk/nextjs";
import {
  Sidebar,
  useSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarGroupAction,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  
import {CustomTrigger}  from "@/components/custom-trigger";
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Conversations",
    url: "#",
    icon: MessageCircleMore,
  },
  {
    title: "Integrations",
    url: "#",
    icon: Settings2,
  },
  {
    title: "Appoitments",
    url: "#",
    icon: CalendarDays,
  },
  {
    title: "Email Marketing",
    url: "#",
    icon: Mail,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    subItems: [
        {
            title: "Account",
            url: "/settings/account",
          },
          {
            title: "Preferences",
            url: "/settings/preferences",
          },
    ]
  },
];

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <div className="flex">
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4 flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="group-data-[collapsible=icon]:hidden">
                AI MAIL GENIE
              </span>
              <Mail
                className="hidden group-data-[collapsible=icon]:block"
                color="#3e9392"
              />
            </div>
            <CustomTrigger />
          </SidebarHeader>

          <SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>MENU</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.subItems ? (
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-full">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    <ChevronLeft className="ml-auto h-4 w-4  transition-transform group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <a href={subItem.url}>{subItem.title}</a>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild>
                <a href={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
  <SidebarGroup>
      <SidebarGroupLabel>DOMAINS</SidebarGroupLabel>
      <SidebarGroupAction title="Add Domain">
        <Plus /> <span className="sr-only">Add Domain</span>
      </SidebarGroupAction>
      <SidebarGroupContent />
    </SidebarGroup>
</SidebarContent>


          <SidebarFooter>
            <SignOutButton>
              <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
                <div>
                  <MonitorSmartphone className="hidden group-data-[collapsible=icon]:block" />
                </div>
                <div>
                  <LogOut className="h-4 w-4" />
                </div>
                <span className="group-data-[collapsible=icon]:hidden">
                  Sign out
                </span>
              </div>
            </SignOutButton>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
