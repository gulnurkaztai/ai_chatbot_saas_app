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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useDomain } from "@/hooks/use-domain";
import { CustomTrigger } from "@/components/custom-trigger";
import { useState } from "react";
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
    ],
  },
];

type Props = {
  min?: boolean;
  domains:
    | { id: string; name: string; icon: string | null }[]
    | null
    | undefined;
};

export function AppSidebar({ domains, min }: Props) {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const { register, onAddDomain, loading, errors, isDomain } = useDomain();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
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
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                          >
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
                <Dialog>
                  <DialogTrigger>
                    <Plus className="cursor-pointer text-ironside" size={25} onClick={() => handleOpenDialog} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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
