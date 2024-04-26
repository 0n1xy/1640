"use client";
import React from "react";
import { useMediaQuery } from "@mui/material";
import MobileStudentContribute from "../Mobile/Student/Contribution/page";
import StudentPrompt from "../Desktop/Student/Prompt";
import Navbar from "../components/DestopNav";
import Menu from "../components/Menu";
import MobileAddPrompt from "../Mobile/Student/Add";
import StudentPage from "../Mobile/Student/page";

export default function Student() {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <div>
      {matches == true && (
        <div>
          <Navbar />
          <div className="flex flex-row">
            <Menu />
            <StudentPrompt />
          </div>
        </div>
      )}
      {matches == false && <StudentPage />}
    </div>
  );
}
