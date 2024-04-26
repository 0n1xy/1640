import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import StViewPage from "@/app/Desktop/Student/View/page";

export default function StudentViewPage() {
    return (
        <div>
            <Navbar />
        <div className="flex flex-row">
            <Menu />
            <StViewPage />
        </div>
        </div>
    );
  }