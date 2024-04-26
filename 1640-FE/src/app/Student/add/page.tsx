import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import AddNew from "@/app/Desktop/Student/AddNew";

export default function AddPrompt() {
    return (
        <div>
            <Navbar />
        <div className="flex flex-row">
            <Menu />
            <AddNew />
        </div>
        </div>
    );
  }