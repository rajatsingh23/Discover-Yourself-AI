import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import {ChatBubble} from "./components/ChatBubble"
import {useState} from "react";
function App() {
  const [guide, setGuide] = useState("kabir das")
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar setGuide={setGuide} />

        <main className="flex flex-col flex-1 relative h-screen">
          <div className="h-screen">
            <ChatBubble guide={guide} />
          </div>
          
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
