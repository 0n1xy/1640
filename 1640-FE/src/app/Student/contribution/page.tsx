"use client";

import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import Contribution from "@/app/Desktop/Student/Contribution/page";
import MobileStudentContribute from "@/app/Mobile/Student/Contribution/page";
import { useMediaQuery } from "@mui/material";

export default function StudentContribution() {
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <div>
      {matches == true && 
        <div>
          <Navbar />
          <div className="flex flex-row">
            <Menu />
            <Contribution />
          </div>
        </div>
      }
      {matches == false && <MobileStudentContribute />}
    </div>
  );
}
