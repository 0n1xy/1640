"use client";

import { Divider, styled } from "@mui/material";
import { StudentCardTitle } from "@/app/Desktop/Student/AddNew";
import { useEffect, useState } from "react";
import { PostCard } from "@/app/Desktop/MarketingCoordinator/page";

interface submissionsApi {
  _id: string;
  description: string;
  createdAt: string;
  contributionID: string
}


export default function SecondHomePage(props: any) {
  const [closePage, setClosePage] = useState(false);
  const [submissions, setSubmissions] = useState<submissionsApi[]>();
  const handleClosePage = () => {
    setClosePage(props.closePage);
  };

  const contributionsAPI = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      alert("Fail to connect server");
    }
  };

  useEffect(() => {
    contributionsAPI();
  }, []);

  return (
    <div className="h-full bg-white">
      {closePage == false && (
        <BigCOntainer>
          <StudentCardTitle
            event={handleClosePage}
            title={props.contributionTitle}
            content={props.contributionTitle}
            time={props.contributionStartDay}
            role={"User"}
          />
          <Divider variant="middle" color="#BCBCBC" />
          <div className="grid grid-cols-2 gap-4">
            {submissions?.map((submission) => (
              <div key={submission._id}>
                {
                props.contributionID === `${submission.contributionID}` &&
                // props.contributionStatus === "Accept" && 
                (
                  <PostCard
                    title={submission.description}
                    content={submission.description}
                    time={submission.createdAt}
                    role={"User"}
                    event={undefined}
                    postId={undefined}
                  />
                )}
              </div>
            ))}
          </div>
        </BigCOntainer>
      )}
    </div>
  );
}

const BigCOntainer = styled("div")`
  position: absolute;
  z-index: 1;
  background: white;
  width: 100%;
  height: 100%;
`;
