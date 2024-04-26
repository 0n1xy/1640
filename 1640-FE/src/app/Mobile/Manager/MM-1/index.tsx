"use client";
import { Button, Divider, styled } from "@mui/material";

import { ManagerPageContainer } from "../page";
import { PostTitle } from "@/app/Desktop/manager/FacultyPost";
import { useState } from "react";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MM2Page from "../MM-2";

export default function MM1Page(props: any) {
  const [isClosePost, setIsClosePost] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [currentPost, setCurrentPost] = useState("semester1");

  const closeSemester = () => {
    setIsClosePost(props.handleClick);
  };

  const openPostDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.id;
    setCurrentPost(postId);
    console.log(postId);
    setIsOpenPost(!isOpenPost);
    console.log(isOpenPost);
  };

  return (
    <div>
      {isClosePost == false && (
        <ManagerPageContainer className="absolute top-0 bg-white h-full">
          <CardTitle onClick={closeSemester}>
            <ArrowBackIcon className="self-center" />
            <PostTitle title={props.facultyTitle} content={props.description} />
          </CardTitle>
          <Divider variant="middle" color="#BCBCBC" />
          <MobileCardScroll>
            {props.semester?.map((item) => (
              <div  key={item.id}>
                {isOpenPost == true && currentPost === `${item.id}` && (
                  <MM2Page post={props.semester} title={item.semesterTitle}
                  content={item.semesterContent} postNum = {item.postNum}
                  time={item.semesterTime} role={item.role} id ={item.id}
                  handleClick = {setIsClosePost}/>
                )}
              <MobileCardContainer
                onClick={openPostDetail}
                id={item.id}>
                <TitleStyle className="text-start">
                  {item.semesterTitle}
                </TitleStyle>
                <ContentStyle className="text-start">
                  {item.semesterContent}
                </ContentStyle>
                <Divider variant="middle" color="#BCBCBC" />
                <CardInformationContainer className="flex gap-[20px]">
                  <div className="flex flex-row gap-[10px]">
                    <CalendarTodayOutlinedIcon sx={{ color: "#666F8D" }} />
                    <InformationStyle className="self-center">
                      {item.semesterTime}
                    </InformationStyle>
                  </div>
                  <div className="flex flex-row gap-[10px]">
                    <AccountCircleOutlinedIcon sx={{ color: "#666F8D" }} />
                    <InformationStyle className="self-center">
                      {item.role}
                    </InformationStyle>
                  </div>
                </CardInformationContainer>
              </MobileCardContainer>
              </div>
            ))}
          </MobileCardScroll>
        </ManagerPageContainer>
      )}
    </div>
  );
}

export const MobileCardContainer = styled("button")`
  border-radius: 10px;
  border: 1px solid #bcbcbc;
  margin: 10px 20px;
  padding: 10px;
  &:hover {
    border: 1px solid #0085ff;
  }
`;

export const MobileCardScroll = styled("div")`
  overflow-y: scroll;
`;

export const CardTitle = styled("a")`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0px 20px;
`;

const TitleStyle = styled("p")`
  font-size: 18px;
  font-weight: 700;
  color: black;
`;

const ContentStyle = styled("p")`
  font-size: 16px;
  font-weight: 500;
  color: #666f8d;
`;

export const InformationStyle = styled("p")`
  font-size: 12px;
  font-weight: 500;
  color: #666f8d;
`;

export const CardInformationContainer = styled("div")`
    min-width = 700px;
    min-height = 100px;
    margin: 10px 0px 10px 30px; 
`;
