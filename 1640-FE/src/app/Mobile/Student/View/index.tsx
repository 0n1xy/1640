"use client";

import {
  AddStudentTitleStyle,
  BtnSubmit,
  InputImageContainer,
  UploadFileContainer,
} from "@/app/Desktop/Student/AddNew";

import { useState } from "react";

//icon
import { PostCardTitle } from "../../MC/MC2";
import {
  DisplayDataContainer,
  ViewStudentImage,
} from "@/app/Desktop/Student/View/page";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import MobileUpdatePrompt from "../Update";

export default function MobileViewPrompt(props: any) {
  const [isClosePost, setIsClosePost] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleClosePost = () => {
    setIsClosePost(props.closePage);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  return (
    <div>
      {isClosePost == false && (
        <div className="absolute bg-white overflow-x-scroll h-full">
          {openUpdate == true && (
            <MobileUpdatePrompt
              handleCloseUpdate={setOpenUpdate}
              promptTitle={props.promptTitle}
              postTitle={props.postTitle}
              postContent = {props.postContent}
              promptContent={props.promptContent}
              promptTime={props.promptTime}
              promptRole={props.promptRole}
              postImage = {props.postImage}
              postFile = {props.postFile}
              contributionTitle = {props.contributionTitle}
            />
          )}
          <PostCardTitle
            title={props.postTitle}
            content={""}
            event={handleClosePost}
            time={props.postTime}
            role={props.postRole}
          />
          <div className="flex flex-col items-center ml-[20px]">
            <AddStudentTitleStyle className="self-start">
              Title
            </AddStudentTitleStyle>
            <DisplayDataContainer>{props.title}</DisplayDataContainer>
            <AddStudentTitleStyle className="self-start">
              Description
            </AddStudentTitleStyle>
            <DisplayDataContainer>{props.content}</DisplayDataContainer>
            <AddStudentTitleStyle className="self-start">
              Image
            </AddStudentTitleStyle>
            <InputImageContainer>
              {props.postImage?.map((image:any) => (
                <ViewStudentImage key={image.imageId} src={image.src} />
              ))}
            </InputImageContainer>
            <AddStudentTitleStyle className="self-start">
              Docs
            </AddStudentTitleStyle>
            <InputImageContainer>
              {props.postFile.map((file:any) => (
                <UploadFileContainer key={file.fileId}>
                  <DescriptionOutlinedIcon />
                  {file.fileName}
                  <ArrowCircleDownOutlinedIcon />
                </UploadFileContainer>
              ))}
            </InputImageContainer>
          </div>
          <BtnSubmit onClick={handleOpenUpdate}>Update</BtnSubmit>
        </div>
      )}
    </div>
  );
}
