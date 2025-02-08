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
import { AcademicCapIcon,  ArchiveBoxIcon,  ArrowTrendingDownIcon,  BoltIcon,  BookOpenIcon,  ChartBarIcon,  PencilSquareIcon,  PhotoIcon, RectangleStackIcon} from "@heroicons/react/24/outline"
import { Dialog } from "@radix-ui/react-dialog"
import ProjectModal from "../modal/project-modal"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Todos",
    url: "/",
    icon: PencilSquareIcon,
  },
  {
    title: "Philosophy",
    url: "/philosophies",
    icon: AcademicCapIcon,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: ArchiveBoxIcon,
  },
  // {
  //   title: "Memories",
  //   url: "/memories",
  //   icon: PhotoIcon,
  // },
  {
    title: "Goals",
    url: "/goals",
    icon: ChartBarIcon,
  },
  {
    title: "Notes",
    url: "/notes",
    icon: BookOpenIcon,
  },

  {
    title: "Flashcards",
    url: "/flashcards",
    icon: BoltIcon,
  },
  {
    title: "Topics",
    url: "/topics",
    icon: ArrowTrendingDownIcon,
  },

  // {
  //   title: "Transcript",
  //   url: "/notes",
  //   icon: PresentationChartBarIcon,
  // },
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
      if (data && !isFetching) {
        dispatch(allProjects(data));
      }
  }, [data, dispatch, isFetching]);

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
              {projects.slice(0, 4)?.map((item) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton asChild>
                    <a href={'/'}>
                      <span>{item.emoji}</span>
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
      onOpenChange={(isOpen) => {dispatch(setOpenProjectModal(isOpen)); console.log(isOpen) }}
    >
      <ProjectModal closeModal={() => dispatch(setOpenProjectModal(false))} />
    </Dialog>
    </Sidebar>
  )
}
