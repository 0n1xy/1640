"use client";

import {
  AddStudentContentStyle,
  AddStudentTitleStyle,
  BackIcon,
  InputImageContainer,
  StudentCardTitleContainer,
  UploadFileContainer,
} from "@/app/Desktop/Student/AddNew";
import { CardInformationContainer, InformationStyle } from "../../Manager/MM-1";
import { Divider } from "@mui/material";
import { useState } from "react";
import { DisplayDataContainer, ViewStudentImage } from "@/app/Desktop/Student/View/page";
//icon
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";



export default function MobilePostDetail(props: any) {
  const [isClosePost, setIsClosePost] = useState(false);

  const handleClosePost = () => {
    setIsClosePost(props.handleClickEvent);
  };

  return (
    <div>
      {isClosePost == false && (
        <div className="absolute bg-white top-0 h-full">
          <PostCardTitle
            title={props.title}
            content={""}
            event={handleClosePost}
            time={props.time}
            role={props.role}
          />
          <div className="flex flex-col items-center ml-[20px]">
            <AddStudentTitleStyle className="self-start">Title</AddStudentTitleStyle>
            <DisplayDataContainer>{props.title}</DisplayDataContainer>
            <AddStudentTitleStyle className="self-start">Description</AddStudentTitleStyle>
            <DisplayDataContainer>{props.content}</DisplayDataContainer>
            <AddStudentTitleStyle className="self-start">Image</AddStudentTitleStyle>
            <InputImageContainer>
            {props.postImage?.map((image) => (
              <ViewStudentImage key={image.imageId} src={image.src} />
            ))}
          </InputImageContainer>
          <AddStudentTitleStyle className="self-start">Docs</AddStudentTitleStyle>
          <InputImageContainer>
            {props.postFile.map((file) => (
              <UploadFileContainer key={file.fileId}>
                <DescriptionOutlinedIcon />
                {file.fileName}
                <ArrowCircleDownOutlinedIcon />
              </UploadFileContainer>
            ))}
          </InputImageContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export const PostCardTitle = ({
  title,
  content,
  event,
  time,
  role,
}: {
  title: string;
  content: string;
  event: any;
  time: string;
  role: string;
}) => {
  return (
    <div>
      <StudentCardTitleContainer
        onClick={event}
        className="flex flex-row gap-3"
      >
        <BackIcon />
        <div>
          <AddStudentTitleStyle>{title}</AddStudentTitleStyle>
          <AddStudentContentStyle>{content}</AddStudentContentStyle>
          <CardInformationContainer className="flex gap-[20px]">
            <div className="flex flex-row gap-[10px]">
              <CalendarTodayOutlinedIcon sx={{ color: "#666F8D" }} />
              <InformationStyle className="self-center">
                {time}
              </InformationStyle>
            </div>
            <div className="flex flex-row gap-[10px]">
              <AccountCircleOutlinedIcon sx={{ color: "#666F8D" }} />
              <InformationStyle className="self-center">
                {role}
              </InformationStyle>
            </div>
          </CardInformationContainer>
        </div>
      </StudentCardTitleContainer>
      <Divider variant="middle" color="#BCBCBC" />
    </div>
  );
};
