import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"  
import { LeftSidebar } from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import { AudioPlayer } from "./components/AudioPlayer";


const MainLayout = () => {
    const isMobile=false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
         <ResizablePanelGroup orientation="horizontal" className='flex-1 flex h-full overflow-hidden p-2'>
            <AudioPlayer />

            {/*Left side bar      */}
            <ResizablePanel defaultSize={220} minSize={isMobile ?0:110} maxSize={250}>
              <LeftSidebar/>
            </ResizablePanel >

            	<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
            {/* yaha par main outlet ayega jo har bar change hota hai    */}

            <ResizablePanel defaultSize={isMobile ?80 :40}>
              <Outlet />
            </ResizablePanel>

            	<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
            {/*  right side bar    */}

            <ResizablePanel defaultSize={180} minSize={0} maxSize={200} collapsedSize={0}>
              <FriendsActivity />
            </ResizablePanel>

         </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout