import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import UpdatePromptPage from "@/app/Desktop/Student/Update/pages";

export default function UpdatePrompt() {
    return (
        <div>
            <Navbar />
        <div className="flex flex-row">
            <Menu />
            <UpdatePrompt />
        </div>
        </div>
    );
  }