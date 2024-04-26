"use client";

import Navbar from "@/app/components/DestopNav";
import BottomNavbar from "@/app/components/MobileNavBa/page";
import { Divider, styled } from "@mui/material";

import { Card, SearchBar } from "@/app/Desktop/manager/FacultyMenu";
import { useState } from "react";
import MM1Page from "./MM-1";

export default function MobileManagerPage() {
  
  const [search, setSearch] = useState("");
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [currentPost, setCurrentPost] = useState("semester1");

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
    console.log(lowerCase);
  };

  const openPostDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const postId = e.currentTarget.id;
    setCurrentPost(postId);
    console.log(currentPost);
    setIsOpenPost(!isOpenPost);
    console.log(isOpenPost);
  };

  const getfaculty = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/faculties`, {
        method: 'GET'
      })
      return res.json();
  
    } catch (error) {
        alert("Fail to connect to server")
    }
  }

  return (
    <ManagerPageContainer>
      <Navbar />
      <ManagerPageContainer className="relative">
        <SearchBar content={""} event={handleSearch} />
        <Divider variant="middle" color="#BCBCBC" />
        {faculties &&
          faculties.length > 0 &&
          faculties
            .filter((faculty) => {
              return search.toLowerCase() === " "
                ? faculty
                : faculty.title.toLowerCase().includes(search);
            })
            .map(({ id, title, content }) => (
              <Card
                key={id}
                title={title}
                content={content}
                id={id}
                event={openPostDetail}
              />
            ))}
        {faculties.map(({ id, title, description, semester }) => (
          <div key={id}>
            {isOpenPost == true &&
              semester.map((item) => (
                <div key={item.id}>
                  {currentPost === `${id}` && (
                    <MM1Page
                      semester={semester}
                      facultyTitle={title}
                      description={description}
                      handleClick={setIsOpenPost}
                    />
                  )}
                </div>
              ))}
          </div>
        ))}
      </ManagerPageContainer>
      <BottomNavbar />
    </ManagerPageContainer>
  );
}

export const ManagerPageContainer = styled("div")`
  width: 100%;
  height: 932px;
  display: flex;
  flex-direction: column;
`;

export const faculties = [
  {
    id: "faculty1",
    title: "IT",
    content: "Information of Technology",
    description: "Description",
    image: "",
    semester: [
      {
        id: "semester1",
        semesterTitle: "University in Summer",
        semesterContent:
          "Contribute your experiences talking and writing about what school was like during the summer.",
        semesterTime: "Jan 24, 2024",
        role: " User",
        postNum: "3 post",
        post: [
          {
            postId: "post1",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
          {
            postId: "post10",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
          {
            postId: "post11",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
        ],
      },
      {
        id: "semester2",
        semesterTitle: "University in Winter",
        semesterContent:
          "Contribute your experiences talking and writing about what school was like during the summer.",
        semesterTime: "Jan 24, 2024",
        role: " User",
        postNum: "3 post",
        post: [
          {
            postId: "post4",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
          {
            postId: "post12",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
        ],
      },
      {
        id: "semester3",
        semesterTitle: "University in Spring",
        semesterContent:
          "Contribute your experiences talking and writing about what school was like during the summer.",
        semesterTime: "Jan 24, 2024",
        role: " User",
        postNum: "3 post",
        post: [
          {
            postId: "post5",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
        ],
      },
    ],
  },
  {
    id: "faculty2",
    title: "Business",
    content: "Business",
    description: "Description",
    image: "",
    semester: [
      {
        id: "semester7",
        semesterTitle: "University in Summer",
        semesterContent:
          "Contribute your experiences talking and writing about what school was like during the summer.",
        semesterTime: "Jan 24, 2024",
        role: " User",
        postNum: "3 post",
        post: [
          {
            postId: "post7",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
        ],
      },
    ],
  },
  {
    id: "faculty3",
    title: "Design Graphic",
    content: "Design Graphic",
    description: "Description",
    image: "",
    semester: [
      {
        id: "semester8",
        semesterTitle: "University in Summer",
        semesterContent:
          "Contribute your experiences talking and writing about what school was like during the summer.",
        semesterTime: "Jan 24, 2024",
        role: " User",
        postNum: "3 post",
        post: [
          {
            postId: "post8",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
        ],
      },
      {
        id: "semester9",
        semesterTitle: "University in Summer",
        semesterContent:
          "Contribute your experiences talking and writing about what school was like during the summer.",
        semesterTime: "Jan 24, 2024",
        role: " User",
        postNum: "3 post",
        post: [
          {
            postId: "post9",
            postTitle: "Magazine for University of Greenwich",
            postRole: "Admin1",
            postTime: "1 min ago",
          },
        ],
      },
    ],
  },
];
