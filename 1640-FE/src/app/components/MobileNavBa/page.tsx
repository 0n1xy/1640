"use client";

import { styled } from "@mui/material";

export const navbar = [
  { role: "", name: "Home", href: "/home", icon: "/Icon/HomeIcon.png" },
  { role: "", name: "Faculties", href: "", icon: "/Icon/IconFaculty.png" },
  { role: "", name: "Prompts", href: "", icon: "/Icon/Prompts.png" },
  { role: "", name: "Contribution", href: "/Student", icon: "/Icon/List.png" },
];

export default function BottomNavbar() {
  return (
    <NavbarContainer>
      {navbar.map((item, i) => (
        <NavbarButton key={i} href={item.href}>
          <NavbarIcon src={item.icon}></NavbarIcon>
          <NavbarTxt>{item.name}</NavbarTxt>
        </NavbarButton>
      ))}
    </NavbarContainer>
  );
}

const NavbarContainer = styled("div")`
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #d9d9d99d;
  & :focus {
    background: #2388ff;
  }
`;

const NavbarButton = styled("a")`
  width: 100%;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
`;

const NavbarIcon = styled("img")`
  width: 25px;
  height: 25px;
`;
const NavbarTxt = styled("p")`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`;
