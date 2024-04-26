"use client";

import Navbar from "@/app/components/DestopNav";

import BottomNavbar from "@/app/components/MobileNavBa/page";
import { Divider, styled } from "@mui/material";
import { useState } from "react";
import { ManagerPageContainer } from "../../Manager/page";
import MobileViewPrompt from "../View";

export default function MobileStudentContribute() {

  const [openPost, setOpenPost] = useState(false);
  const [currentPost, setCurrentPost] = useState("post1");

  const handleOpenPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptID = e.currentTarget.id;
    setCurrentPost(promptID);
    console.log(promptID);
    setOpenPost(!openPost);
  };

  return (
    <ManagerPageContainer>
      <Navbar />
      <div className="h-full relative">
        {openPost == true &&
          contributions.prompts.map(
            ({
              posts,
              promptId,
              promptTitle,
              promptContent,
              promptRole,
              promptTime,
            }) => (
              <div key={promptId}>
                {posts?.map((post) => (
                  <div key={post.postId}>
                    {currentPost == `${post.postId}` && (
                      <MobileViewPrompt
                        postTitle={post.postTitle}
                        postContent = {post.postContent}
                        handleClickEvent={setOpenPost}
                        postImage={post.postImage}
                        postFile={post.postFile}
                        postTime={post.postTime}
                        postRole={post.postRole}
                        promptTitle={promptTitle}
                        promptContent={promptContent}
                        promptRole={promptRole}
                        promptTime={promptTime}
                        contributionTitle ={contributions.contributionTitle}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
        <div className="ml-10 mb-5">
          <TitleStyle>{contributions.title} </TitleStyle>
          <ContentStyle>{contributions.description}</ContentStyle>
        </div>
        <Divider variant="middle" color="#BCBCBC" />
        {contributions.prompts.map(({ promptId, posts }) => (
          <div key={promptId}>
            {posts?.map((post) => (
              <DescriptionsBarContainer
                key={post.postId}
                id={post.postId}
                onClick={handleOpenPost}
              >
                <ContentStyle>{post.postTitle}</ContentStyle>
                {posts.length > 0 && <Icon src="/Icon/FrameGreen.png" />}
                {posts.length <= 0  && <Icon src="/Icon/Frame.png" />}
              </DescriptionsBarContainer>
            ))}
          </div>
        ))}
      </div>
      <BottomNavbar />
    </ManagerPageContainer>
  );
}

const Icon = styled("img")`
  width: 32px;
  height: 32px;
`;

const DescriptionsBarContainer = styled("button")`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
  align-items: center;
  text-align: start;
  margin: 20px;
  min-height: 60px;
  padding: 20px;
`;

const TitleStyle = styled("p")`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`;

const ContentStyle = styled("p")`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

export const contributions = {
  title: "My Contribution",
  description: "Description",
  contributionTitle: "Information of Technology",
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
              name: "file-name.docs",
            },
            {
              fileId: "file2",
              name: "file-name.docs",
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
              name: "file-name.docs",
            },
            {
              fileId: "file23",
              name: "file-name.docs",
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
              name: "file-name.docs",
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
