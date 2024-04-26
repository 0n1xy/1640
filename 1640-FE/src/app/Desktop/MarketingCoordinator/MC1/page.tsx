"use client";

import { Button, Divider, styled } from "@mui/material";
import { CardPromptContainer, PromptBigContainer } from "../../Student/Prompt";
import {
  AddStudentContentStyle,
  AddStudentTitleStyle,
  BackIcon,
  InputImageContainer,
  StudentCardTitleContainer,
  UploadFileContainer,
} from "../../Student/AddNew";
import {
  CardInformationContainer,
  InformationStyle,
} from "../../manager/FacultyPost/Card";
import { useEffect, useState } from "react";
import {
  DisplayDataContainer,
  ViewStudentImage,
} from "../../Student/View/page";
import ChangeStatus from "../ChangeStatus";
import { BtnCratePrompt } from "../page";
//icon
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

interface apiFile {
  _id: string;
  imageURL: string[];
  docURL: string;
}

export default function MC1Page(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosePost, setIsClosePost] = useState(false);
  const [files, setFile] = useState<apiFile[]>();

  const [imageURL, setImageURL] = useState();

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClickClose = () => {
    setIsClosePost(props.closePage);
    console.log(isClosePost);
  };

  const getFile = async () => {
    try {
      const param = props.fileID;
      const url = "http://localhost:7000/api/file/";
      const fetchURL = url.concat(param);

      const res = await fetch(fetchURL, {
        method: "GET",
      });

      console.log(fetchURL);

      const data = await res.json();
      if (data.length > 0) {
        setFile(data);
      }
    } catch (error) {
      alert("Fail to connect to server");
    }
  };

  function callFile(name: any, i) {
    return <ViewStudentImage src={name}></ViewStudentImage>;
  }

  useEffect(() => {
    getFile();
  }, []);

  return (
    <div>
      {isClosePost == false && (
        <CardPromptContainer className="bg-white max-h-[700px] w-[780px]">
          {isOpen == true && (
            <ChangeStatus
              closePage={setIsOpen}
              promptTitle={props.promptTitle}
              submissionID={props.submissionID}
            />
          )}
          <StudentCardTitle
            title={props.postTitle}
            content={""}
            time={props.postTime}
            role={props.postRole}
            event={undefined}
          />
          <div className="overflow-y-scroll">
            <div className="flex flex-col m-10 gap-5 ">
              <AddStudentTitleStyle>Title</AddStudentTitleStyle>
              <DisplayDataContainer>{props.postTitle}</DisplayDataContainer>
              <AddStudentTitleStyle>Description</AddStudentTitleStyle>
              <DisplayDataContainer>{props.postContent}</DisplayDataContainer>
              <AddStudentTitleStyle>Image</AddStudentTitleStyle>
              {/* <ViewStudentImage src={props.postImg.postImg} /> */}
              <InputImageContainer className="flex flex-row">
                {/* {files?.map((file) =>
                  file.imageURL.map((url, i) => (
                    <div key={i}>
                      <div>{url}</div>
                    </div>
                  ))
                )} */}
                <ViewStudentImage src={`https://firebasestorage.googleapis.com/v0/b/project-8268186441646603153.appspot.com/o/images%2FIconFaculty.png%20%20%20%20%20%20%20Fri%20Apr%2026%202024%2005%3A45%3A48%20GMT%2B0700%20(Gi%E1%BB%9D%20%C4%90%C3%B4ng%20D%C6%B0%C6%A1ng)?alt=media&token=8ec4fa6f-8540-4856-ad3b-82ed6def0f16`} />
                {files?.forEach((file, i) => callFile(file))}
              </InputImageContainer>
              <AddStudentTitleStyle>Docs</AddStudentTitleStyle>
              <InputImageContainer className="flex flex-row">
                  <UploadFileContainer>
                    <DescriptionOutlinedIcon />
                    {"Doc1.docx"}
                    <ArrowCircleDownOutlinedIcon />
                  </UploadFileContainer>
              </InputImageContainer>
              <BtnCratePrompt
                onClick={handleClickOpen}
                className="max-w-[100px]"
              >
                Approve
              </BtnCratePrompt>
            </div>
          </div>
        </CardPromptContainer>
      )}
    </div>
  );
}

const StudentCardTitle = ({
  title,
  content,
  time,
  role,
  event,
}: {
  title: string;
  content: string;
  time: string;
  role: string;
  event: any;
}) => {
  return (
    <div>
      <StudentCardTitleContainer
        href=""
        onClick={event}
        className="flex flex-row gap-[8px]"
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
