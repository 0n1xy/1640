"use client";
import { PromptBigContainer, CardPromptContainer } from "../Prompt";
import {
  AddStudentTitleStyle,
  InputImageContainer,
  UploadFileContainer,
  PromptMenu,
  StudentCardTitle,
  BtnSubmit,
} from "../AddNew";

import { styled } from "@mui/material";

//icon
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import { useEffect, useState } from "react";
import UpdatePromptPage from "../Update/pages";

interface apiFile {
  _id: string;
  imageURL: string[];
  docURL: string;
  createdAt: string;
}

export default function StViewPage(props: any) {
  const [closeAddNew, setCloseAddNew] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [files, setFile] = useState<apiFile>();

  const handleCloseViewPage = () => {
    setCloseAddNew(props.closePage);    
    window.location.href = "/Student/contribution";
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  const getFile = async () => {
    const param = props.fileID;
    const url = `http://localhost:7000/api/file/${param}`;
    try {
      const res = await fetch(url, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setFile(data);
      } else {
        alert("Fail to connect to server");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  useEffect(() => {
    getFile();
  },[]);

  console.log(files)
  return (
    <PromptBigContainer className="absolute m-0 bg-white">
      {openUpdate == true && (
        <UpdatePromptPage
          handleCloseUpdate={setOpenUpdate}
          title={props.contributionTitle}
          content={props.contributionTitle}
          time={props.contributionStartDay}
          description = {props.description}
          submissionID = {props.submissionID}
          docURL ={files?.docURL}
          imageURL = {files?.imageURL}
        />
        )}
      {closeAddNew == false && (
        <div className="flex flex-row w-[100%]">
          <PromptMenu />
          <CardPromptContainer>
            <StudentCardTitle
              event={handleCloseViewPage}
              title={props.contributionTitle}
              content={props.contributionTitle}
              time={props.contributionStartDay}
              role={"User"}
            />
            <div className="flex flex-col gap-5 m-10">
              <AddStudentTitleStyle>Description</AddStudentTitleStyle>
              <DisplayDataContainer>{props.description}</DisplayDataContainer>
              <AddStudentTitleStyle>Image</AddStudentTitleStyle>
              <InputImageContainer>
              {files?.imageURL.map((image, i) => (
                <ViewStudentImage src={image} key={i}/>
              ))}
              </InputImageContainer>
              <AddStudentTitleStyle>Docs</AddStudentTitleStyle>     
                  <InputImageContainer>
                    <UploadFileContainer >
                    <DescriptionOutlinedIcon />
                    <a href={files?.docURL}>word.doc</a>
                    <ArrowCircleDownOutlinedIcon />
                  </UploadFileContainer>              
                  </InputImageContainer>
              <BtnSubmit onClick={handleOpenUpdate}>Update</BtnSubmit>
            </div>
          </CardPromptContainer>
        </div>
      )}
    </PromptBigContainer>
  );
}

export const DisplayDataContainer = styled("div")`
  width: 90%;
  min-height: 50px;
  border-radius: 8px;
  border: 1px solid #a4a4a4;
  align-content: center;
  padding: 10px;
`;

export const ViewStudentImage = styled("img")`
  max-width: 200px;
  max-height: 200px;
`;
