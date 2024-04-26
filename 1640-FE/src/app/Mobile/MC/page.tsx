"use client";

import Navbar from "@/app/components/DestopNav";
import { ManagerPageContainer } from "../Manager/page";
import BottomNavbar from "@/app/components/MobileNavBa/page";
import { CardTitle } from "../Manager/MM-1";
import { PostTitle } from "@/app/Desktop/manager/FacultyPost";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import {
  BtnCratePrompt,
  BtnPromptTextStyle,
  ButtonPrompt,
  ButtonPromptContainer,
  PostNumberContainer,
} from "@/app/Desktop/MarketingCoordinator/page";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { SearchBar } from "@/app/Desktop/manager/FacultyMenu";
import MobileAddPromptTable from "./CreatePromptTable";
import MobileMCPost from "./MC1";

export default function MobileMCPage() {
  const [search, setSearch] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("prompt1");
  const [openAddTable, setOpenAddTable] = useState(false);
  const [openPost, setOpenPost] = useState(false);

  const handleOpenTable = () => {
    setOpenAddTable(!openAddTable);
  };

  const handleOpenPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptID = e.currentTarget.id;
    setCurrentPrompt(promptID);
    setOpenPost(!openPost);
  };

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  return (
    <ManagerPageContainer>
      <Navbar />
      <div className="ml-auto mr-auto flex flex-col h-full w-full relative">
        {openAddTable == true &&
          promptData.prompts.map(({ promptId, posts }) => (
            <div key={promptId}>
              <MobileAddPromptTable closeTable={handleOpenTable} post={posts} />
            </div>
          ))}
        <CardTitle>
          <PostTitle
            title={promptData.title}
            content={promptData.description}
          />
        </CardTitle>
        <SearchBar content={""} event={handleSearch} />
        <Divider variant="middle" color="#BCBCBC" />
        {promptData.prompts &&
          promptData.prompts.length > 0 &&
          promptData.prompts
            .filter((prompt) => {
              return search.toLowerCase() === ""
                ? prompt
                : prompt.promptTitle.toLowerCase().includes(search);
            })
            .map((prompt) => (
              <ButtonPromptContainer className="h-[70px]" key={prompt.promptId}>
                <ButtonPrompt onClick={handleOpenPost} id={prompt.promptId}>
                  <FolderOutlinedIcon />
                  <BtnPromptTextStyle>{prompt.promptTitle}</BtnPromptTextStyle>
                  <PostNumberContainer>
                    <BtnPromptTextStyle sx={{ minWidth: "50px" }}>
                      {prompt.postNumber}
                    </BtnPromptTextStyle>
                  </PostNumberContainer>
                </ButtonPrompt>
              </ButtonPromptContainer>
            ))}
        {openPost == true &&
          promptData.prompts.map(
            ({
              promptId,
              promptTitle,
              promptContent,
              promptRole,
              promptTime,
              postNumber,
              posts,
            }) => (
              <div key={promptId}>
                {currentPrompt == `${promptId}` && (
                  <MobileMCPost
                    closeTable={setOpenPost}
                    posts={posts}
                    promptTitle={promptTitle}
                    promptRole = {promptRole}
                    promptTime = {promptTime}
                    postNumber ={postNumber}
                    promptContent = {promptContent}
                  />
                )}
              </div>
            ))}
        <BtnCratePrompt onClick={handleOpenTable} className="self-center">
          Create New Prompts
        </BtnCratePrompt>
      </div>
      <BottomNavbar />
    </ManagerPageContainer>
  );
}

export const promptData = {
  title: "Information of Technology",
  description: "Description",
  prompts: [
    {
      promptId: "prompt1",
      promptTitle: "University in Summer",
      promptContent:
        "Contribute your experiences talking and writing about what school was like during the summer.",
      promptTime: "Jan 20, 2024",
      promptRole: "User",
      postNumber: "45",
      posts: [
        {
          postId: "post1",
          postTitle: "School scene when it happens in summer 1",
          postContent:
            "Summer in Australia falls between December and February and is famous for sunny days with high temperatures. It’s the wet season in the tropical north (November to April), which is characterised by monsoonal rains and high humidity.",
          postTime: "Jan 24, 2024",
          postRole: "User",
          postImage: [
            {
              imageId: "img1",
              src: "/images/imgdefa.png",
            },
            {
              imageId: "img2",
              src: "/images/imgdefa.png",
            },
          ],
          postFile: [
            {
              fileId: "file1",
              fileName: "file-name.docs",
            },
            {
              fileId: "file2",
              fileName: "file-name.docs",
            },
          ],
        },
        {
          postId: "post4",
          postTitle: "School scene when it happens in summer 2",
          postContent:
            "Summer in Australia falls between December and February and is famous for sunny days with high temperatures. It’s the wet season in the tropical north (November to April), which is characterised by monsoonal rains and high humidity.",
          postTime: "Jan 24, 2024",
          postRole: "User",
          postImage: [
            {
              imageId: "img3",
              src: "/images/imgdefa.png",
            },
            {
              imageId: "img4",
              src: "/images/imgdefa.png",
            },
          ],
          postFile: [
            {
              fileId: "file11",
              fileName: "file-name.docs",
            },
            {
              fileId: "file23",
              fileName: "file-name.docs",
            },
          ],
        },
      ],
    },
    {
      promptId: "prompt2",
      promptTitle: "University in Winter",
      promptContent:
        "Contribute your experiences talking and writing about what school was like during the winter.",
      promptTime: "Jan 20, 2024",
      promptRole: "User",
      postNumber: "30",
      posts: [
        {
          postId: "post2",
          postTitle: "School scene when it happens in summer",
          postContent:
            "Summer in Australia falls between December and February and is famous for sunny days with high temperatures. It’s the wet season in the tropical north (November to April), which is characterised by monsoonal rains and high humidity.",
          postTime: "Jan 24, 2024",
          postRole: "User",
          postImage: [
            {
              imageId: "img37",
              src: "/images/imgdefa.png",
            },
          ],
          postFile: [
            {
              fileId: "file39",
              fileName: "file-name.docs",
            },
          ],
        },
      ],
    },
    {
      promptId: "prompt3",
      promptTitle: "University in Spring",
      promptContent:
        "Contribute your experiences talking and writing about what school was like during the spring.",
      promptTime: "Jan 30, 2024",
      promptRole: "User",
      postNumber: "26",
    },
  ],
};
