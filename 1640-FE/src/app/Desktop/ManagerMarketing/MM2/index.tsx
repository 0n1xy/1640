"use client";

import { CardTitle, InformationStyle, MobileCardContainer } from "@/app/Mobile/Manager/MM-1";
import {
  CardPromptContainer,
  MenuPromptContainer,
  PromptBigContainer,
} from "../../Student/Prompt";
import { PostTitle } from "../../manager/FacultyPost";
import { SearchBar } from "../../manager/FacultyMenu";
import { Divider, styled } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BtnPromptTextStyle,
  ButtonPrompt,
  ButtonPromptContainer,
  PostNumberContainer,
} from "../../MarketingCoordinator/page";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { AddStudentTitleStyle, BackIcon } from "../../Student/AddNew";
import { MobileCardTitle } from "@/app/Mobile/Manager/MM-2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from '@mui/icons-material/SimCardDownload';
import cookie from "js-cookie";

interface apiSubmissions {
  _id: string;
  description: string;
  facultyID: string;
  createdAt:string;
  contributionID: string
}

interface apiFaculties {
  _id: string;
  facultyName: string;
  createdAt: Date;
}

interface apiFile {
  _id: string;
  imageURL: string[];
  docURL: string;
  createdAt: string;
}

export default function ManagerPost(props: any) {
  const facultyID = cookie.get("facultyID");
  const [isClosePost, setIsClosePost] = useState(false);
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();
  const [faculty, setFaculty] = useState<apiFaculties[]>();
  const [files, setFile] = useState<apiFile>();

  const [currentSubmissions, setCurrentSubmissions] = useState("")

  const handleClosePage = () => {
    setIsClosePost(props.closePage);
  };

  const getSubmissions= async () => {
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

  const handleFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentId = e.currentTarget.id;
    setCurrentSubmissions(currentId)
    const param = currentId
    const url = `http://localhost:7000/api/file/`
    const fetchURL = url.concat(param)
    try {
      const res = await fetch(fetchURL, {
      method: "GET",
    });
    console.log(fetchURL)    
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div>
      {isClosePost == false && (
        <PromptBigContainer className="absolute bg-white m-0">
          <MenuPromptContainer />
          <CardPromptContainer>
            <MobileCardTitle
              title={props.contributionTitle}
              content={props.contributionTitle}
              time={props.time}
              role={"User"}
              postNumber={""}
              onClickEvent={handleClosePage}
            />
            <div className="overflow-y-scroll h-[700px] ">
            {submissions?.map(((item) => (
                <div key={item._id} className="flex flex-row gap-2 justify-center w-full">
                    {props.contributionID === `${item.contributionID}` && (      
                      <CardContainer id={item._id} onClick={handleFile} className="w-[80%]">
                      <AddStudentTitleStyle>
                        {item.description}
                      </AddStudentTitleStyle>
                      <div className="flex flex-row gap-10">
                        <PostNumberContainer >
                          <InformationStyle>Admin</InformationStyle>
                        </PostNumberContainer>
                        <div className="flex flex-row self-center gap-1">
                          <AccessTimeIcon />
                          <InformationStyle className="self-center">{item.createdAt}</InformationStyle>
                        </div>
                        <DownloadIcon sx={{marginLeft:"auto"}}/>
                      </div>
                    </CardContainer>
                    )}
                </div>
            )))}
            </div>
          </CardPromptContainer>
        </PromptBigContainer>
      )}
    </div>
  );
}

 const CardContainer = styled("button")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid #bcbcbc;
  margin: 10px 20px;
  padding: 10px;
  &:hover {
    border: 1px solid #0085ff;
  }
`;