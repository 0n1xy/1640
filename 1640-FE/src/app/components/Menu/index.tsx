'use client'
import { ButtonGroup, styled } from '@mui/material';
import { useState } from 'react';

  export const menus = [
      {role:"", 
      name:"Home",
      href:"/home",
      icon: "/Icon/HomeIcon.png"},
      {role:"",
      name:"Faculties",
      href:"",
      icon: "/Icon/IconFaculty.png"},
      {role:"",
      name:"Prompts",
      href:"/Student",
      icon: "/Icon/Prompts.png"},
      {role:"",
      name:"Contribution",
      href:"/Student/contribution",
      icon: "/Icon/Chat.png"} 
]

export default function Menu() {
    return (
      <Container>
        <MenuButtonGroup>
        {menus.map((item, i) =>(
            <MenuBtn key={i} href={item.href}>
            <MenuIcon src={item.icon} />
            <TxtBtnStyle>{item.name}</TxtBtnStyle>
            </MenuBtn>
          ))}
        </MenuButtonGroup>
      </Container>
    );
  }
  
const Container = styled("div")`
  min-width: 300px;
  min-height: 600px;
  background: white;
  border-radius: 0px 30px 30px 0px;
  border: 2px solid #D9D9D9;
  margin: 20px 0px;
`

const MenuButtonGroup = styled(ButtonGroup)`
  max-width: 300px;
  min-height: 600px;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const MenuBtn = styled("a")`
  min-width: 250px;   
  place-items: center;
  height: 60px;
  background: white;
  border-style: none;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  &:hover{
      background: #D9D9D9;
  }
`

const TxtBtnStyle = styled("p")`
  font-size: 25px;
  font-weight: 600;
  color: black;
`
const MenuIcon = styled("img")`
  width: 38px;
  height: 38px;
`