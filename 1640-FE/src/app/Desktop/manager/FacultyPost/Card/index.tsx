'use client'
import { styled } from '@mui/material';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function FacultyPostCard(props : any) {
    return (
    <Container>
        <CardContainer href= {props.link}>
        <div className="m-[30px] flex flex-col gap-[20px]">
        <TitleStyle>{props.title}</TitleStyle>
        <ContentStyle>
        {props.content}
        </ContentStyle>
        </div>
        <Divider variant="middle" color="#BCBCBC"/>
        <CardInformationContainer className='flex gap-[20px]'>
            <div className="flex flex-row gap-[10px]">        
            <CalendarTodayOutlinedIcon sx={{color: "#666F8D"}} />
            <InformationStyle className='self-center'>
                {props.time}
            </InformationStyle>               
            </div>
            <div className="flex flex-row gap-[10px]">        
            <AccountCircleOutlinedIcon sx={{color: "#666F8D"}} />
            <InformationStyle className='self-center'>
                {props.role}
            </InformationStyle>               
            </div>
        </CardInformationContainer>   
      </CardContainer>
    </Container>

    );
  }

const Container = styled("div")`
  min-width = 800px;
  min-height = 250px;
  border-radius: 10px;
  border: 1px solid #BCBCBC;
  margin: 10px;
  &:hover{
    border: 1px solid #0085FF;
  }
`

const CardContainer = styled("a")`
  min-width = 800px;
  min-height = 250px;
`

const TitleStyle = styled("p")`
  font-size: 18px;
  font-weight: 700;
  color: black;
`

const ContentStyle = styled("p")`
  font-size: 16px;
  font-weight: 500;
  color: #666F8D;
`

export const InformationStyle = styled("p")`
  font-size: 12px;
  font-weight: 500;
  color: #666F8D;
`

export const CardInformationContainer = styled("div")`
    min-width = 700px;
    min-height = 100px;
    margin: 10px 0px 10px 30px;
`