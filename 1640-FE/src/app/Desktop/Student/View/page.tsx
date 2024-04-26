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
import { useState } from "react";
import UpdatePromptPage from "../Update/pages";

export default function StViewPage(props: any) {
  const [closeAddNew, setCloseAddNew] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleCloseViewPage = () => {
    setCloseAddNew(props.closePage);
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  return (
    <PromptBigContainer className="absolute m-0 bg-white">
      {openUpdate == true && (
        <UpdatePromptPage
          handleCloseUpdate={setOpenUpdate}
          title={props.contributionTitle}
          content={props.contributionTitle}
          time={props.contributionStartDay}
          description = {props.description}
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
                {/* {props.postImage?.map((image: any) => (
                  <ViewStudentImage key={image.imageId} src={image.src} />
                ))} */}
                <ViewStudentImage src={`https://firebasestorage.googleapis.com/v0/b/project-8268186441646603153.appspot.com/o/images%2FIconFaculty.png%20%20%20%20%20%20%20Fri%20Apr%2026%202024%2005%3A45%3A48%20GMT%2B0700%20(Gi%E1%BB%9D%20%C4%90%C3%B4ng%20D%C6%B0%C6%A1ng)?alt=media&token=8ec4fa6f-8540-4856-ad3b-82ed6def0f16`}/>
              </InputImageContainer>
              <AddStudentTitleStyle>Docs</AddStudentTitleStyle>
              <InputImageContainer>
                  <UploadFileContainer >
                    <DescriptionOutlinedIcon />
                    {"Doc1.docx"}
                    <ArrowCircleDownOutlinedIcon />
                  </UploadFileContainer>
              </InputImageContainer>
              {/* <BtnSubmit onClick={handleOpenUpdate}>Update</BtnSubmit> */}
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
