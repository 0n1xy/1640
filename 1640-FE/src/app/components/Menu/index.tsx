"use client";
import { ButtonGroup, styled } from "@mui/material";
import { useState } from "react";
import cookie from "js-cookie";

export const menus = [
  { role: "Admin", name: "Home", href: "/home", icon: "/Icon/HomeIcon.png" },
  {
    role: "Admin",
    name: "Faculties",
    href: "/Register",
    icon: "/Icon/Register.png",
  },
  
  { role: "Student", name: "Home", href: "/home", icon: "/Icon/HomeIcon.png" },
  { role: "Student", name: "Prompts", href: "/Student", icon: "/Icon/Prompts.png" },
  {
    role: "Student",
    name: "Contribution",
    href: "/Student/contribution",
    icon: "/Icon/Contribution.png",
  },

  { role: "Manager", name: "Home", href: "/home", icon: "/Icon/HomeIcon.png" },
  {
    role: "Manager",
    name: "Faculties",
    href: "/manager",
    icon: "/Icon/IconFaculty.png",
  },
  {
    role: "Manager",
    name: "Analysis",
    href: "/manager/analysis",
    icon: "/Icon/Analysis.png",
  },

  { role: "Coordinator", name: "Home", href: "/home", icon: "/Icon/HomeIcon.png" },
];
const userValue = cookie.get("role");
const filteredMenus = menus.filter((item) => item.role === userValue);
export default function Menu() {
  return (
    <Container>
      {filteredMenus.map((item, i) => (
        <MenuBtn key={i} href={item.href}>
          <MenuIcon src={item.icon} />
          <TxtBtnStyle>{item.name}</TxtBtnStyle>
        </MenuBtn>
      ))}
    </Container>
  );
}

const Container = styled("div")`
  min-width: 300px;
  min-height: 600px;
  background: white;
  border-radius: 0px 30px 30px 0px;
  border: 2px solid #d9d9d9;
  margin: 20px 0px;
`;

const MenuBtn = styled("a")`
  min-width: 250px;
  place-items: center;
  height: 60px;
  margin: 30px 0px;
  border-style: none;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  &:hover {
    background: #d9d9d9;
  }
`;

const TxtBtnStyle = styled("p")`
  font-size: 25px;
  font-weight: 600;
  color: black;
`;
const MenuIcon = styled("img")`
  width: 38px;
  height: 38px;
`;
