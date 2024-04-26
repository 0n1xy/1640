"use client";
import { Divider, styled } from "@mui/material";

import { AddStudentContentStyle, AddStudentTitleStyle} from "@/app/Desktop/Student/AddNew";
import { useState } from "react";
import { MobileCardTitle } from "../../Manager/MM-2";
import { SearchBar } from "@/app/Desktop/manager/FacultyMenu";
import { CardInformationContainer, InformationStyle} from "../../Manager/MM-1";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MobilePostDetail from "../MC2";

export default function MobileMCPost(props: any) {
  const [isClosePost, setIsClosePost] = useState(false);
  const [currentPost, setCurrentPost] = useState("post1");
  const [openPostDetail, setOpenPostDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClosePost = () => {
    setIsClosePost(props.closeTable);
  };

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const handleOpenPostDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postID = e.currentTarget.id;
    setCurrentPost(postID);
    console.log(postID)
    setOpenPostDetail(!openPostDetail);
  };


  return (
    <div className="absolute bg-white top-0 h-full">
      {isClosePost == false && (
        <MobileCardTitle
          title={props.promptTitle}
          content={props.promptContent}
          time={props.promptTime}
          role={props.promptRole}
          postNumber={props.postNumber}
          onClickEvent={handleClosePost}
        />
      )}
      {openPostDetail == true && props.posts?.map((post: any) => (
        <div key={post.postId}>
          {currentPost == `${post.postId}` && (
          <MobilePostDetail 
            title={post.postTitle}
            content={post.postContent}
            time={post.postTime}
            role={post.postRole}
            onClickEvent = {setOpenPostDetail}
            postImage = {post.postImage}
            postFile = {post.postFile}
          />)}
        </div>
      ))}
      <Divider variant="middle" color="#BCBCBC" />
      <SearchBar content={"Search prompt"} event={handleSearch} />
      <div className="overflow-scroll h-[450px]">
      {props.posts && props.posts?.length > 0 && props.posts?.filter((post: any) => {
              return search.toLowerCase() === "" ? post
              : post.postTitle.toLowerCase().includes(search) }).map((post: any) => (
        <div key={post.postId} >
          <MobilePostCard
            title={post.postTitle}
            content={post.postContent}
            time={post.postTime}
            role={post.postTime}
            event={handleOpenPostDetail}
            postId={post.postId}
          />
        </div>
      ))}
      </div>
    </div>
  );
}


export const MobilePostCard = ({
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
        <div className="p-5">
          <AddStudentContentStyle className="text-start">{content}</AddStudentContentStyle>
        </div>
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
  margin: 25px 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
`;

const CardTitleContainer = styled("div")`
  padding: 0px 20px;
  border-radius: 15px 15px var(--inputs-select-none, 0px)
    var(--inputs-select-none, 0px);
  background: #e6e6e6;
`;

