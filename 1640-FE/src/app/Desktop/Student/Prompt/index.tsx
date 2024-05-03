"use client";
import { Divider, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { PostTitle } from "../../manager/FacultyPost";
import { SearchBar } from "../../manager/FacultyMenu";
import AddNew from "../AddNew";
import {
  CardInformationContainer,
  InformationStyle,
  MobileCardContainer,
} from "@/app/Mobile/Manager/MM-1";
import cookie from "js-cookie";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface apiSubmissions {
  _id: string;
  description: string;
  statusID: string;
  contributionID: string;
  facultyID: string;
  createdAt: string;
  fileID: string;
  userID: string;
}

interface apiContribution {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: string;
  contributionCloseDay: Date;
  submissionID: string;
}

export default function StudentPrompt() {
  const [search, setSearch] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("prompt1");
  const [openAddNew, setOpenAddNew] = useState(false);
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();
  const [contributions, setContribution] = useState<apiContribution[]>();
  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
    console.log(lowerCase);
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

  const handleOpenAddNewPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptID = e.currentTarget.id;
    setCurrentPrompt(promptID);
    console.log(promptID);
    setOpenAddNew(!openAddNew);
    console.log(openAddNew);
  };

  useEffect(() => {
    getContribution();
    getSubmissions();
  }, []);

  const userID = cookie.get("userID");
  
  return (
    <PromptBigContainer>
      {openAddNew == true &&
        contributions?.map((contribution) => (
          <div key={contribution._id}>
            {currentPrompt == `${contribution._id}` &&(
                <AddNew
                  submissionID={contribution._id}
                  closePage={setOpenAddNew}
                  promptTitle={contribution.contributionTitle}
                  promptRole={"User"}
                  promptTime={contribution.contributionStartDay}
                  postNumber={""}
                  promptContent={contribution.contributionTitle}
                />
              )}
          </div>
        ))}
      <MenuPromptContainer>
        <PromptPostTitle />
        <SearchBar event={handleSearch} content="Search find contribution" />
        <Divider variant="middle" color="#BCBCBC" />
      </MenuPromptContainer>
      <CardPromptContainer className="overflow-y-scroll h-[700px]">
        {contributions &&
          contributions?.length > 0 &&
          contributions
            ?.filter((contribution) => {
              return search.toLowerCase() === ""
                ? contribution
                : contribution.contributionTitle.toLowerCase().includes(search);
            })
            .map((contribution) => (
              <div key={contribution._id}>
                {(
                  <MobileCardContainer
                    onClick={handleOpenAddNewPage}
                    id={contribution._id}
                    className="w-[80%]"
                  >
                    <TitleStyle className="text-start">
                      {contribution.contributionTitle}
                    </TitleStyle>
                    <ContentStyle className="text-start">
                      {contribution.contributionTitle}
                    </ContentStyle>
                    <Divider variant="middle" color="#BCBCBC" />
                    <CardInformationContainer className="flex gap-[20px]">
                      <div className="flex flex-row gap-[10px]">
                        <CalendarTodayOutlinedIcon sx={{ color: "#666F8D" }} />
                        <InformationStyle className="self-center">
                          {contribution.contributionStartDay}
                        </InformationStyle>
                      </div>
                      <div className="flex flex-row gap-[10px]">
                        <AccountCircleOutlinedIcon sx={{ color: "#666F8D" }} />
                        <InformationStyle className="self-center">
                          {"User"}
                        </InformationStyle>
                      </div>
                    </CardInformationContainer>
                  </MobileCardContainer>
                )}
              </div>
            ))}
      </CardPromptContainer>
    </PromptBigContainer>
  );
}

export const PromptPostTitle = () => {
  return (
    <div>
      <PostTitle title="" content="" />
    </div>
  );
};

export const PromptBigContainer = styled("div")`
  width: 75%;
  display: flex;
  flex-direction: row;
  margin: 20px 30px;
`;

export const CardPromptContainer = styled("div")`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
  min-height: 800px;
  box-shadow: 2px 0px 20px 0px rgb(124 124 124 / 47%),
    0px -1px 20px 0 rgb(255 253 253);
  border-radius: 0px 30px 30px 0px;
`;

export const MenuPromptContainer = styled("div")`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 50%;

  box-shadow: 2px 0px 20px 0px rgb(124 124 124 / 47%),
    0px -1px 20px 0 rgb(255 253 253);
  border-radius: 30px 0px 0px 30px;
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
