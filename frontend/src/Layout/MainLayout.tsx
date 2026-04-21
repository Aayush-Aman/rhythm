import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"  


const MainLayout = () => {
    const isMobile=true;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
         <ResizablePanelGroup>
            {/*Left side bar      */}
            <ResizablePanel defaultSize={20} minSize={isMobile ?0:10} maxSize={30}>
              left side bar 
            </ResizablePanel >
            {/* yaha par main outlet ayega jo har bar change hota hai    */}

            <ResizablePanel defaultSize={isMobile ?80 :60}>
              <Outlet />
            </ResizablePanel>
            {/*  right side bar    */}

            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
              Right side bar 
            </ResizablePanel>

         </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout