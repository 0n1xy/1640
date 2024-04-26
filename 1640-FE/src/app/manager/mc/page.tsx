"use client";

import MCPage from "@/app/Desktop/MarketingCoordinator/page";
import MobileMCPage from "@/app/Mobile/MC/page";
import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import { useMediaQuery } from "@mui/material";
export default function MC() {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <div>
      {matches == true && (
        <div>
          <Navbar />
          <div className="flex flex-row h-full">
            <Menu />
            <MCPage />
          </div>
        </div>
      )}
      {matches == false && <MobileMCPage />}
    </div>
  );
}
