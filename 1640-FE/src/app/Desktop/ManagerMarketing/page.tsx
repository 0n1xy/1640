"use client";

import { Divider, styled } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CardPromptContainer,
  MenuPromptContainer,
  PromptBigContainer,
} from "../Student/Prompt";

import { Card, SearchBar } from "../manager/FacultyMenu";
import {
  CardInformationContainer,
  CardTitle,
  InformationStyle,
  MobileCardContainer,
  MobileCardScroll,
} from "@/app/Mobile/Manager/MM-1";
import { PostTitle } from "../manager/FacultyPost";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManagerPost from "./MM2";

interface apiFaculties {
  _id: string;
  facultyName: string;
  createdAt: Date;
}

interface apiContribution {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: string;
  contributionCloseDay: Date;
  submissionID: string;
}

export default function ManagerPage() {
  const [search, setSearch] = useState("");
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(
    "0f5ae243-f9ad-4ca1-969f-ded4d9dee265"
  );
  const [currentPost, setCurrentPost] = useState(
    "7a8e6020-4fce-4e11-aac8-62a41402b745"
  );
  const [faculty, setFaculty] = useState<apiFaculties[]>();
  const [contribution, setContribution] = useState<apiContribution[]>();

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
    console.log(lowerCase);
  };

  const handleOpenPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.id;
    setCurrentPost(postId);
    console.log(postId);
    setIsOpenPost(!isOpenPost);
    console.log(isOpenPost);
  };

  const openPostDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.id;
    setCurrentFaculty(postId);
    console.log(postId);
  };

  const getFaculty = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/faculties`, {
        method: "GET",
      });
      const data = await res.json();
      setFaculty(data);
    } catch (error) {
      alert("Fail to connect to server");
    }
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

  useEffect(() => {
    getFaculty();
    getContribution();
  }, []);

  return (
    <PromptBigContainer>
      {faculty?.map((facultyItem) => (
        <div key={facultyItem._id}>
          {currentFaculty === `${facultyItem._id}` && (
            <div>
              {contribution?.map((item) => (
                <div key={item._id}>
                  {isOpenPost == true && currentPost === `${item._id}` && (
                    <ManagerPost
                      id={item._id}
                      contributionTitle={item.contributionTitle}
                      time={item.contributionStartDay}
                      closePage={setIsOpenPost}
                      facultyID={facultyItem._id}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <MenuPromptContainer>
        <ManagerContainer>
          <SearchBar content={""} event={handleSearch} />
          <Divider variant="middle" color="#BCBCBC" />
          {faculty &&
            faculty.length > 0 &&
            faculty
              .filter((item) => {
                return search.toLowerCase() === " "
                  ? item
                  : item.facultyName.toLowerCase().includes(search);
              })
              .map((item) => (
                <Card
                  key={item._id}
                  title={item.facultyName}
                  content={item.facultyName}
                  id={item._id}
                  event={openPostDetail}
                />
              ))}
        </ManagerContainer>
      </MenuPromptContainer>
      <CardPromptContainer>
        <ManagerContainer>
          {faculty?.map((item) => (
            <div key={item._id}>
              {currentFaculty === `${item._id}` && (
                <CardTitle>
                  <PostTitle title={item.facultyName} content={"Description"} />
                </CardTitle>
              )}
            </div>
          ))}
          <Divider variant="middle" color="#BCBCBC" />
          <div className="overflow-y-scroll h-[700px] flex flex-col">
            {contribution?.map((item) => (
              <div key={item._id} className="self-center">
                {
                  <div>
                    <MobileCardContainer onClick={handleOpenPost} id={item._id} className="w-[100%]">
                      <TitleStyle className="text-start">
                        {item.contributionTitle}
                      </TitleStyle>
                      <ContentStyle className="text-start">
                        {item.contributionTitle}
                      </ContentStyle>
                      <Divider variant="middle" color="#BCBCBC" />
                      <CardInformationContainer className="flex gap-[20px]">
                        <div className="flex flex-row gap-[10px]">
                          <CalendarTodayOutlinedIcon
                            sx={{ color: "#666F8D" }}
                          />
                          <InformationStyle className="self-center">
                            {item.contributionStartDay}
                          </InformationStyle>
                        </div>
                        <div className="flex flex-row gap-[10px]">
                          <AccountCircleOutlinedIcon
                            sx={{ color: "#666F8D" }}
                          />
                          <InformationStyle className="self-center">
                            User
                          </InformationStyle>
                        </div>
                      </CardInformationContainer>
                    </MobileCardContainer>
                  </div>
                }
              </div>
            ))}
          </div>
        </ManagerContainer>
      </CardPromptContainer>
    </PromptBigContainer>
  );
}

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

const ManagerContainer = styled("div")`
  width: 100%;
  max-height: 932px;
  display: flex;
  flex-direction: column;
`;
