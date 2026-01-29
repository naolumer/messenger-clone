import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar ({children}:{
    children : React.ReactNode;
}) {
    const currentUser = getCurrentUser();
    return (
        <div className="h-full">
            <MobileFooter/>
            <DesktopSidebar currentUser = {currentUser!}/>
            <main className="lg:pl-20 h-full">
                {children}
            </main>
            
        </div>
    )
}

export default Sidebar