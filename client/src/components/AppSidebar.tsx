
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {useState} from "react";

// Menu items.
const items = [
  {
    title: "Kabir Das",
    url: "#",
    image: "kabir.jfif",
  },
  {
    title: "Guru Nanak Dev",
    url: "#",
    image: "gurunanak.webp",
  },
  {
    title: "J. Krishnamurti",
    url: "#",
    image: "jk.jpg",
  }
]

type AppSideBarProps = {
  setGuide: (title: string) => void
}

export function AppSidebar({setGuide}: AppSideBarProps) {
  const [clickedGuide, setClickedGuide] = useState("kabir das")
  const handleGuide = (title: string) => {
    setGuide(title.toLowerCase())
    
    setClickedGuide(title.toLowerCase())
    
  }
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-7">Discover Yourself</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Guides</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`py-1 ${clickedGuide === item.title.toLowerCase() ? 'bg-muted': ''}`}>
                  <SidebarMenuButton asChild>
                    <a className="cursor-pointer" onClick={() => handleGuide(item.title)}>
                            <Avatar>
                              <AvatarImage src={item.image} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
