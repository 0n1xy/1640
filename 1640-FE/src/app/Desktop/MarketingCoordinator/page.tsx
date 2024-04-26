"use client";

import { styled } from "@mui/material";
import React, { useEffect } from "react";

import { Divider } from "@mui/material";
import {
  PromptBigContainer,
  CardPromptContainer,
  MenuPromptContainer,
} from "../Student/Prompt";
import { SearchBar } from "../manager/FacultyMenu";
import { useState } from "react";

import {
  AddStudentContentStyle,
  AddStudentTitleStyle,
  BackIcon,
  StudentCardTitleContainer,
} from "../Student/AddNew";
import {
  CardInformationContainer,
  InformationStyle,
} from "../manager/FacultyPost/Card";
import MC1Page from "./MC1/page";
//icon
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

interface apiContribution {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: string;
  contributionCloseDay: Date;
  submissionID: string;
}

interface apiSubmissions {
  _id: string;
  description: string;
  contributionID: string;
  createdAt: string;
  fileID: string;
}

export default function MCPage() {
  const [search, setSearch] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState(
    "7a8e6020-4fce-4e11-aac8-62a41402b745"
  );
  const [currentPost, setCurrentPost] = useState("post1");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [contributions, setContribution] = useState<apiContribution[]>();
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();

  const openAddPromptTable = () => {
    setIsOpen(!isOpen);
  };
  const numberSubmissions = submissions?.length;
  const handleClickFaculty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptId = e.currentTarget.id;
    setCurrentPrompt(promptId);
    console.log(promptId);
  };

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
    console.log(lowerCase);
  };

  const getContribution = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/contributions`, {
        method: "GET",
      });
      const data = await res.json();
      setContribution(data);
    } catch (error) {
      alert("Fail to connect to server");
    }
  };

  const getSubmissions = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/submissions`, {
        method: "GET",
      });
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      alert("Fail to connect to server");
    }
  };

  const openPostDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.id;
    setCurrentPost(postId);
    console.log(currentPost);
    setIsOpenPost(!isOpenPost);
    console.log(isOpenPost);
  };

  useEffect(() => {
    getContribution();
    getSubmissions();
  }, []);

  return (
    <PromptBigContainer>
      <MenuPromptContainer>
        <SearchBar event={handleSearch} content="Search find Prompt" />
        <Divider variant="middle" color="#BCBCBC" />
        <div className="overflow-y-scroll">
          {contributions &&
            contributions.length > 0 &&
            contributions
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.contributionTitle.toLowerCase().includes(search);
              })
              .map((item) => (
                <ButtonPromptContainer key={item.contributionTitle}>
                  <ButtonPrompt onClick={handleClickFaculty} id={item._id}>
                    <FolderOutlinedIcon />
                    <BtnPromptTextStyle>
                      {item.contributionTitle}
                    </BtnPromptTextStyle>
                    <PostNumberContainer>
                      <BtnPromptTextStyle sx={{ minWidth: "50px" }}>
                        
                      </BtnPromptTextStyle>
                    </PostNumberContainer>
                  </ButtonPrompt>
                </ButtonPromptContainer>
              ))}
        </div>
        <BtnCratePrompt onClick={openAddPromptTable}>
          Create New Prompts
        </BtnCratePrompt>
      </MenuPromptContainer>
      <CardPromptContainer>
        {contributions?.map((item) => (
          <div key={item._id}>
            {currentPrompt === `${item._id}` && (
              <StudentCardTitle
                title={item.contributionTitle}
                content={item.contributionTitle}
                time={item.contributionStartDay}
                role={"User"}
                postNumber={""}
              />
            )}
          </div>
        ))}
        <div className="overflow-y-scroll h-[600px]">
          {submissions?.map((submission) => (
            <React.Fragment key={submission._id}>
              {currentPrompt === `${submission.contributionID}` && (
                <PostCard
                  title={submission.description}
                  content={submission.description}
                  time={submission.createdAt}
                  role={"User"}
                  event={openPostDetail}
                  postId={submission._id}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {contributions?.map((contributions) => (
          <div key={contributions._id} className="absolute">
            {submissions?.map((submission) => (
              <div key={submission._id}>
                {currentPost === `${submission._id}` && (
                  <MC1Page
                    postTitle={submission.description}
                    postContent={submission.description}
                    postTime={submission.createdAt}
                    postRole={"User"}
                    postFile={submission.fileID}
                    promptTitle={contributions.contributionTitle}
                    closePage={setIsOpenPost}
                    fileID={submission.fileID}
                    submissionID={submission._id}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </CardPromptContainer>
    </PromptBigContainer>
  );
}

export const ButtonPrompt = styled("button")`
  display: flex;
  width: 365px;
  color: #767676;
  place-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const ButtonPromptContainer = styled("div")`
  margin: 20px;
  width: 365px;
  min-height: 70px;
  align-self: center;
  color: #767676;
  & :focus {
    border-radius: 4px;
    border: 1px solid #24a3ff;
    color: #24a3ff;
    & div {
      color: white;
      background: #24a3ffb2;
    }
  }
  & div {
    color: white;
    background: #767676;
  }
`;

export const PostNumberContainer = styled("div")`
  max-height: 50px;
  background: #24a3ffb2;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

export const BtnPromptTextStyle = styled("p")`
  font-size: 22px;
  font-weight: 700;
`;

const PostCardContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 50px;
  min-width: 657px;
  min-height: 250px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
`;

const CardTitleContainer = styled("div")`
  padding: 0px 20px;
  min-width: 657px;
  min-height: 45.455px;
  border-radius: 15px 15px var(--inputs-select-none, 0px)
    var(--inputs-select-none, 0px);
  background: #e6e6e6;
`;

const CardContentContainer = styled("div")`
  min-width: 609px;
  min-height: 150px;
`;

export const BtnCratePrompt = styled("button")`
  width: 85%;
  min-height: 47px;
  border-radius: 10px;
  background: #24a3ff;
  color: white;
  align-self: center;
  margin-top: auto;
  margin-bottom: 50px;
`;

export const StudentCardTitle = ({
  title,
  content,
  time,
  role,
  postNumber,
}: {
  title: string;
  content: string;
  time: string;
  role: string;
  postNumber: number;
}) => {
  return (
    <div>
      <StudentCardTitleContainer href="" className="flex flex-row gap-[8px]">
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
        <PostNumberContainer className="text-center">
          <BtnPromptTextStyle sx={{ minWidth: "100px", color: "white" }}>
            {postNumber} 
          </BtnPromptTextStyle>
        </PostNumberContainer>
      </StudentCardTitleContainer>
      <Divider variant="middle" color="#BCBCBC" />
    </div>
  );
};

export const PostCard = ({
  title,
  content,
  time,
  role,
  event,
  postId,
}: {
  title: string;
  content: string;
  time: string;
  role: string;
  event: any;
  postId: any;
}) => {
  return (
    <PostCardContainer>
      <button onClick={event} id={postId}>
        <CardTitleContainer>
          <AddStudentTitleStyle>{title}</AddStudentTitleStyle>
        </CardTitleContainer>
        <CardContentContainer className="p-5">
          <AddStudentContentStyle className="text-start">
            {content}
          </AddStudentContentStyle>
        </CardContentContainer>
        <Divider variant="middle" color="#BCBCBC" />
        <CardInformationContainer className="flex gap-[20px]">
          <div className="flex flex-row gap-[10px]">
            <CalendarTodayOutlinedIcon sx={{ color: "#666F8D" }} />
            <InformationStyle className="self-center">{time}</InformationStyle>
          </div>
          <div className="flex flex-row gap-[10px]">
            <AccountCircleOutlinedIcon sx={{ color: "#666F8D" }} />
            <InformationStyle className="self-center">{role}</InformationStyle>
          </div>
        </CardInformationContainer>
      </button>
    </PostCardContainer>
  );
};
