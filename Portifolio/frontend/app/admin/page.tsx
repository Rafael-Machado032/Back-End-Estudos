import Header from "@/components/Admin/Header";
import Aside from "@/components/Admin/Aside";
import Principal from "@/components/Admin/Principal";

export default function Home() {
    return (
        <main className="flex flex-col items-center bg-[#0b0f1a] px-4 pb-6">
            
            <div className="flex flex-col w-full max-w-7xl">
                <Header />
                <div className="flex w-full">
                    <Aside />
                    <Principal />
                </div>
                
            </div>
        </main>
    );
}