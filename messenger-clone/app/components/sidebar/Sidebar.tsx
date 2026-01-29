import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar ({children}:{
    children : React.ReactNode;
}) {
    return (
        <div className="h-full">
            <MobileFooter/>
            <DesktopSidebar/>
            <main className="lg:pl-20 h-full">
                {children}
            </main>
            
        </div>
    )
}

export default Sidebar