"use client";

import { use } from "react";
import ManagerPage from "../Desktop/ManagerMarketing/page";
import Navbar from "../components/DestopNav";
import Menu from "../components/Menu";
import { useMediaQuery } from "@mui/material";
import MobileManagerPage from "../Mobile/Manager/page";

export default function ManagerMarketingPage() {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <div>
      {matches == true && (
      <div>
        <Navbar />
        <div className="flex flex-row">
          <Menu />
          <ManagerPage />
        </div>
      </div>
      )}
      {matches == false && <MobileManagerPage />}
    </div>
  );
}
