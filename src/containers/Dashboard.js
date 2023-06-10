import Header from "@/components/header/Header"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
export default function Dashboard({children}) {

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                <div className="flex h-full">
                    <Sidebar />
                    <div className="flex flex-row flex-wrap gap-x-5 w-full p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}