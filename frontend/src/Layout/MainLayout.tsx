import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"  


const MainLayout = () => {
    const isMobile=false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
         <ResizablePanelGroup orientation="horizontal" className='flex-1 flex h-full overflow-hidden p-2'>
            {/*Left side bar      */}
            <ResizablePanel defaultSize={60} minSize={isMobile ?0:10} maxSize={90}>
              left side bar 
            </ResizablePanel >

            	<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
            {/* yaha par main outlet ayega jo har bar change hota hai    */}

            <ResizablePanel defaultSize={isMobile ?80 :40}>
              <Outlet />
            </ResizablePanel>

            	<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
            {/*  right side bar    */}

            <ResizablePanel defaultSize={80} minSize={0} maxSize={105} collapsedSize={0}>
              Right side bar 
            </ResizablePanel>

         </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout