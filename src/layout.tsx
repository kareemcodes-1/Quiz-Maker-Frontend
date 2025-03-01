import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import Navbar from "./components/navbar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { allPhilosophy } from "./slices/philosophySlice"
import { useGetAllPhilosophyQuery } from "./slices/philosophyApiSlice"
import { toast } from "sonner"
import { Toaster } from "./components/ui/sonner"

const removeHtmlTags = (htmlContent: string) => {
  const doc = new DOMParser().parseFromString(htmlContent, "text/html");
  return doc.body.textContent || "";
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isFetching } = useGetAllPhilosophyQuery("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(allPhilosophy(data));
    }
  }, [data, dispatch, isFetching]);

  const { philosophies } = useSelector((state: RootState) => state.philosophy);

  useEffect(() => {
    if (!isFetching && philosophies && philosophies.length > 0) {
      // Get a random index from the array
      const randomIndex = Math.floor(Math.random() * philosophies.length);

      // Get the content of the random philosophy and clean the HTML tags
      const randomPhilosophy = philosophies[randomIndex];
      const cleanedContent = removeHtmlTags(randomPhilosophy?.content || "");

      // Show the toast with the cleaned content of the random philosophy
      toast(`${cleanedContent}`);
    }
  }, [isFetching, philosophies]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <Toaster />
      <Navbar />
      <main className="lg:px-[2rem] px-[1rem] w-full h-screen mt-[1rem]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
