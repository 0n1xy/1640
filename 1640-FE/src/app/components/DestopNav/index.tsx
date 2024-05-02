"use client";

// components/Navbar.tsx

import React, { useState } from "react";
import styled from "@emotion/styled";
import { SearchNormal1, Notification } from "iconsax-react";
import AdminPage from "@/app/Desktop/Admin/page";
import cookie from "js-cookie";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  margin-bottom: 10px;
`;

const Logo = styled.div`
  background-image: url("/logo/logo.png");
  width: 230px;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Avatar = styled.div`
  background-image: url("/Avatar/avatar.png");
  width: 30px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

const SearchContainer = styled.div<{ isFocused: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) => (props.isFocused ? "250px" : "2rem")};
  transition: width 300ms ease-in-out;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  margin-left: -20px;
  left: 10px; // Place it inside the input on the left, adjust as needed
  z-index: 10;
`;

const SearchInput = styled.input<{ isFocused: boolean }>`
  width: 100%;
  margin-left: -20px;
  padding: 0.5rem 2rem 0.5rem 3.5rem; // Increase left padding to avoid overlapping with the icon
  border: 2px solid #ddd;
  border-radius: 9999px;
  font-size: 1rem;
  outline: none;
  opacity: ${(props) => (props.isFocused ? "1" : "0")};
  background-color: white;
  transition: opacity 300ms ease-in-out, width 300ms ease-in-out;
  &:focus {
    opacity: 1;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  & > button {
    background: none;
    border: none;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const toggleSearch = () => {
    setIsFocused((prev) => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openAddPromptTable = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    const cookiesToBeDeleted = [
      "userID",
      "facultyID",
      "role",
      "access_token",
      "refresh_token",
    ];
    cookiesToBeDeleted.forEach((cookieName) => {
      cookie.remove(cookieName);
    });
  };

  return (
    <NavbarContainer className="relative">
      <Logo onClick={(event) => (window.location.href = "/home")} />
      <IconsContainer>
        <div className="flex flex-row gap-5 m-4">
          <a href="/Student">Student</a>
          <a href="/manager">Manager</a>
          <a href="/manager/mc">MC</a>
          <a href="/manager/admin">Admin</a>
          <a href="/" onClick={logOut}>
            Log out
          </a>
        </div>
        <button>
          <Avatar />
        </button>
      </IconsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
