import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import Navbar from "./components/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Navbar />
      <main className="lg:px-[2rem] px-[1rem] w-full h-screen mt-[1rem]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
