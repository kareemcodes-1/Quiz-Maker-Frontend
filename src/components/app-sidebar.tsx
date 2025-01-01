import { Home,Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { allProjects, setOpenProjectModal } from "../../src/slices/projectSlice"
import { useGetAllProjectsQuery } from "../../src/slices/projectApiSlice"
import { useEffect } from "react"
import { ArchiveBoxIcon,  PhotoIcon, PresentationChartBarIcon, RectangleStackIcon } from "@heroicons/react/24/outline"
import { Dialog } from "@radix-ui/react-dialog"
import ProjectModal from "../modal/project-modal"

// Menu items.
const items = [
  {
    title: "Todos",
    url: "/",
    icon: Home,
  },
  {
    title: "Focus",
    url: "/focus",
    icon: ArchiveBoxIcon,
  },
  // {
  //   title: "What I Learnt",
  //   url: "/wil",
  //   icon: BeakerIcon,
  // },
  // {
  //   title: "Philosophy",
  //   url: "/philosophy",
  //   icon: Search,
  // },
  {
    title: "Memories",
    url: "/memories",
    icon: PhotoIcon,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: RectangleStackIcon,
  },
  {
    title: "Plans",
    url: "/plans",
    icon: PresentationChartBarIcon,
  },
  // {
  //   title: "Calendar",
  //   url: "/calendar",
  //   icon: CalendarDateRangeIcon,
  // },
]

export function AppSidebar() {
  const dispatch = useDispatch();
  const {data, isFetching} = useGetAllProjectsQuery('');
  const {projects} = useSelector((state: RootState) => state.project);
  
  useEffect(() => {
      if (data) {
        dispatch(allProjects(data));
      }
  }, [data, dispatch]);

  const {openProjectModal} = useSelector((state: RootState) => state.project);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">Projects <button type="button" onClick={() => dispatch(setOpenProjectModal(true))} className="yena-btn-small !rounded-full !h-[1.5rem] !p-[.3rem]"><Plus className="w-[1rem] h-[1rem]"/></button></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((item) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton asChild>
                    <a href={'/'}>
                      <div style={{background: item.color}} className="rounded-full p-[.3rem]" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <Dialog
      open={openProjectModal}
      onOpenChange={(isOpen) => dispatch(setOpenProjectModal(isOpen))}
    >
      <ProjectModal closeModal={() => dispatch(setOpenProjectModal(false))} />
    </Dialog>
    </Sidebar>
  )
}
