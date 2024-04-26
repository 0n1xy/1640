
import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import StudentPrompt from "@/app/Desktop/Student/Prompt";

export default function Prompt() {
    return (
        <div>
            <Navbar />
        <div className="flex flex-row">
            <Menu />
            <StudentPrompt />
        </div>
        </div>
    );
  }