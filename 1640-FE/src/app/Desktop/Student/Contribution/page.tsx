"use client";

import { Divider, styled } from "@mui/material";
import { useEffect, useState } from "react";
import StViewPage from "../View/page";
import cookie from "js-cookie";

interface apiContribution {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: string;
  contributionCloseDay: Date;
  submissionID: string;
}

interface apiSubmissions {
  _id: string;
  description: string;
  facultyID: string;
  createdAt: string;
  userID: string;
  statusID: string;
  fileID:string;
}

export default function Contribution() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [openView, setOpenView] = useState(false);
  const [contributions, setContribution] = useState<apiContribution[]>();
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();

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
  const userID = cookie.get("userID");

  useEffect(() => {
    getContribution();
    getSubmissions();
  }, []);

  const handleOpenViewPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const promptID = e.currentTarget.id;
    setCurrentPrompt(promptID);
    setOpenView(!openView);
  };

  return (
    <PageContainer className="mt-[20px]">
      {openView == true &&
        contributions?.map((contribution) => (
          <div key={contribution._id}>
            {submissions?.map((submission) => (
              <div key={submission._id}>
                {currentPrompt == `${submission._id}` && (
                  <StViewPage
                    closePage={setOpenView}
                    contributionTitle={contribution.contributionTitle}
                    contributionStartDay = {contribution.contributionStartDay}
                    description = {submission.description}
                    fileID = {submission.fileID}
                    submissionID = {submission._id}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      <div className="m-10 ">
        <TitleStyle>My Contribution</TitleStyle>
        <ContentStyle>Descriptions</ContentStyle>
      </div>
      <Divider variant="middle" color="#BCBCBC" />
      <div className="overflow-y-scroll h-[600px]">
      {submissions?.map((submission) => (
        <div key={submission._id}>
          {
          userID === `${submission.userID}` &&  
          (
            <DescriptionsBarContainer
              key={submission._id}
              id={submission._id}
              onClick={handleOpenViewPage}
              disabled={submission.statusID === "62755508-4288-4e5f-848d-eb69995c8b35"}
            >
              <ContentStyle>{submission.description}</ContentStyle>
              {`${submission.statusID}` === "1741a003-095d-4743-994e-fc975e75a431" && <Icon src="/Icon/FrameInReview.png"/>}
              {`${submission.statusID}`=== "2c142f13-ee10-4616-8c13-5297109fc0fc" && <Icon src="/Icon/FrameGreen.png" />}
              {`${submission.statusID}` === "62755508-4288-4e5f-848d-eb69995c8b35" && <Icon src="/Icon/FrameDeny.png" />}
            </DescriptionsBarContainer>
          )}
        </div>
      ))}
      </div>
    </PageContainer>
  );
}

const PageContainer = styled("div")`
  width: 80%;
  border-radius: 30px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  margin: 0px 50px;
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

export const DescriptionsBarContainer = styled("button")`
  display: flex;
  flex-direction: row;
  gap: 50px;
  min-width: 1013px;
  min-height: 57px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 20px 40px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled("img")`
  width: 32px;
  height: 32px;
`;
