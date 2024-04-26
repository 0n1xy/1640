'use client'
import { styled } from "@mui/material";

import Menu from "@/app/components/Menu";
import FacultyMenu from "./FacultyMenu";
import FacultyPost from "./FacultyPost";
import Navbar from "@/app/components/DestopNav";
import { SessionProvider } from "next-auth/react";

export default function ManagerMarketing() {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <BigContainer>
          <Menu />
          <SmallContainer>
            <FacultyMenu />
            <FacultyPost />
          </SmallContainer>
        </BigContainer>
      </SessionProvider>
    </>
  );
}

const BigContainer = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`

const SmallContainer = styled("div")`
  display: flex;
  flex-direction: row;
  width: 75%;
`