import Aside from "@/components/Admin/Aside";
import Principal from "@/components/Admin/Principal";

export default function Home() {
    return (
        <main className="flex flex-col items-center bg-[#0b0f1a] px-4 pb-6">
            
            <div className="flex w-full max-w-7xl">
                <Aside />
                <Principal />
            </div>
        </main>
    );
}