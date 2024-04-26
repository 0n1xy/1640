"use client";

import React from 'react';
import styled from '@emotion/styled';
import { Home, ArchiveBox, Messages1 } from 'iconsax-react';

const SidebarContainer = styled.div`
  height: 100%;
  background-color: white;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  position: relative;

  &:hover span {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.5s linear;
  }
`;

const IconLabel = styled.span`
  margin-right: 1rem;
`;

const TextLabel = styled.span`
  flex-grow: 1;
  text-align: left;
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(0, -50%);
  margin-left: 10px;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
  white-space: nowrap;
  pointer-events: none;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <IconContainer>
        <Home size="32" />
        <TextLabel>Home</TextLabel>
        <Tooltip>Home</Tooltip>
      </IconContainer>
      <IconContainer>
        <ArchiveBox size="32" />
        <TextLabel>Prompts</TextLabel>
        <Tooltip>Prompts</Tooltip>
      </IconContainer>
      <IconContainer>
        <Messages1 size="32" />
        <TextLabel>Messages</TextLabel>
        <Tooltip>Messages</Tooltip>
      </IconContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
