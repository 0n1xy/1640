"use client";
import { Divider, styled } from "@mui/material";
import {
  CardInformationContainer,
  InformationStyle,
  MobileCardContainer,
} from "../MM-1";
import { ManagerPageContainer } from "../page";
import {
  BtnPromptTextStyle,
  PostNumberContainer,
} from "@/app/Desktop/MarketingCoordinator/page";
import {
  AddStudentContentStyle,
  AddStudentTitleStyle,
  BackIcon,
  StudentCardTitleContainer,
} from "@/app/Desktop/Student/AddNew";
import { useEffect, useState } from "react";
import { PostTitle } from "@/app/Desktop/manager/FacultyPost";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from '@mui/icons-material/SimCardDownload';
export default function MM2Page(props: any) {
  const [currentPost, setPost] = useState("");
  const [isClose, setIsClose] = useState(true);
  useEffect(() => {
    setPost(props.id);
  });

  const handleDownFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleClosePost = () => {
    setIsClose(props.handleClick);
  };

  return (
    <div>
      {isClose == true && <ManagerPageContainer className="absolute top-0 bg-white left-0">
        <MobileCardTitle
          title={props.title}
          content={props.content}
          time={props.time}
          role={props.role}
          postNumber={props.postNum}
          onClickEvent={handleClosePost}
        />
        {props.post.map((posts) => (
          <div key={posts.id} className="self-center">
            {posts.post?.map((item) => (
              <div key={item.postId}>
                {currentPost === `${posts.id}` && (
                  <MobileCardContainer onClick={handleDownFile}>
                    <AddStudentTitleStyle>
                      {item.postTitle}
                    </AddStudentTitleStyle>
                    <div className="flex flex-row gap-10">
                      <PostNumberContainer>
                        <InformationStyle>{item.postRole}</InformationStyle>
                      </PostNumberContainer>
                      <div className="flex flex-row">
                        <AccessTimeIcon />
                        <InformationStyle className="self-center">{item.postTime}</InformationStyle>
                      </div>
                      <DownloadIcon sx={{marginLeft:"auto"}}/>
                    </div>
                  </MobileCardContainer>
                )}
              </div>
            ))}
          </div>
        ))}
      </ManagerPageContainer>}
    </div>
  );
}

export const MobileCardTitle = ({
  title,
  content,
  time,
  role,
  postNumber,
  onClickEvent,
}: {
  title: string;
  content: string;
  time: string;
  role: string;
  postNumber: number;
  onClickEvent: any;
}) => {
  return (
    <div>
      <StudentCardTitleContainer
        onClick={onClickEvent}
        className="flex flex-row gap-[8px]"
      >
        <BackIcon />
        <div>
          <AddStudentTitleStyle>{title}</AddStudentTitleStyle>
          <AddStudentContentStyle>{content}</AddStudentContentStyle>
          <CardInformationContainer className="flex gap-[20px]">
            <div className="flex flex-row gap-[10px]">
              <AccountCircleOutlinedIcon sx={{ color: "#666F8D" }} />
              <InformationStyle className="self-center">
                {role}
              </InformationStyle>
            </div>
            <div className="flex flex-row gap-[10px]">
              <AccessTimeIcon sx={{ color: "#666F8D" }} />
              <InformationStyle className="self-center">
                {time}
              </InformationStyle>
            </div>
          </CardInformationContainer>
        </div>
      </StudentCardTitleContainer>
      <Divider variant="middle" color="#BCBCBC" />
    </div>
  );
};
