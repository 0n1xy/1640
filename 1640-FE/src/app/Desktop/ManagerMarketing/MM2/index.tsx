"use client";

import { CardTitle, InformationStyle, MobileCardContainer } from "@/app/Mobile/Manager/MM-1";
import {
  CardPromptContainer,
  MenuPromptContainer,
  PromptBigContainer,
} from "../../Student/Prompt";
import { PostTitle } from "../../manager/FacultyPost";
import { SearchBar } from "../../manager/FacultyMenu";
import { Divider } from "@mui/material";
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

interface apiSubmissions {
  _id: string;
  description: string;
  facultyID: string;
  createdAt:string;
  sub
}

interface apiFaculties {
  _id: string;
  facultyName: string;
  createdAt: Date;
}

export default function ManagerPost(props: any) {
  const [isClosePost, setIsClosePost] = useState(false);
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();
  const [faculty, setFaculty] = useState<apiFaculties[]>();

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

  useEffect(() => {
    getSubmissions();
  }, []);

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
    } catch (error) {
      
    }
  }
  

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
                <div key={item._id} className="flex flex-row">
                    {props.facultyID === `${item.facultyID}` && (
                      <a href="">
                      <MobileCardContainer id={item._id} className="w-[80%] flex flex-row gap-2 justify-around" onClick={handleFile}>
                      <AddStudentTitleStyle>
                        {item.description}
                      </AddStudentTitleStyle>
                      <div className="flex flex-row gap-10">
                        <PostNumberContainer >
                          <InformationStyle>Admin</InformationStyle>
                        </PostNumberContainer>
                        <div className="flex flex-row">
                          <AccessTimeIcon />
                          <InformationStyle className="self-center">{item.createdAt}</InformationStyle>
                        </div>
                        <DownloadIcon sx={{marginLeft:"auto"}}/>
                      </div>
                    </MobileCardContainer>
                    </a>
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
