"use client";

import AdminPage from "@/app/Desktop/Admin/page";
import MobileMCPage from "@/app/Mobile/MC/page";
import Navbar from "@/app/components/DestopNav";
import Menu from "@/app/components/Menu";
import { useMediaQuery } from "@mui/material";

export default function AdminManagerPage() {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <div>
      {matches == true && (
        <div>
          <Navbar />
          <div className="flex flex-row h-full">
            <Menu />
            <AdminPage />
          </div>
        </div>
      )}
      {matches == false && <MobileMCPage />}
    </div>
  );
}
