"use client";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import magazine from "../../../public/images/Magazine1.png";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import Navbar from "@/app/components/DestopNav";
import ChangeStatus from "../Desktop/MarketingCoordinator/ChangeStatus";
import SecondHomePage from "./homeview";

interface contributionsApi {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: Date;
  contributionCloseDay: Date;
  submissionID: Date;
}

export default function HomePage() {
  const [contributions, setContributions] = useState<contributionsApi[]>();
  const [currentContributions, setCurrentContributions] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentId = e.currentTarget.id;
    setCurrentContributions(currentId);
    setIsOpen(!isOpen);
  };

  const contributionsAPI = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/contributions");
      if (res.ok) {
        const data = await res.json();
        setContributions(data);
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
    <>
      <Navbar />
      <HomePageContainer>
        {contributions?.map((contribution) => (
          <div key={contribution._id}>
            {isOpen == true &&
              currentContributions === `${contribution._id}` && (
                <SecondHomePage
                  closePage={setIsOpen}
                  contributionID={contribution._id}
                  contributionTitle={contribution.contributionTitle}
                  contributionStatus={contribution.contributionStatus}
                  contributionStartDay={contribution.contributionStartDay}
                />
              )}
          </div>
        ))}
        {contributions && contributions.length > 0 && (
          <CardContainer>
            {contributions &&
              contributions.map((contribution, i) => (
                <button
                  key={contribution._id}
                  onClick={handleOpen}
                  className="mt-[50px]"
                  id={contribution._id}
                >
                  <ImageListItem>
                    <CardImg src={magazine.src} />
                    <ImageItemBar
                      title={
                        <ImageItemText>
                          {contribution.contributionTitle}
                        </ImageItemText>
                      }
                    ></ImageItemBar>
                  </ImageListItem>
                </button>
              ))}
          </CardContainer>
        )}
      </HomePageContainer>
    </>
  );
}

const HomePageContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const CardContainer = styled("div")`
  display: flex;
  min-width: 1300px;
  flex-wrap: wrap;
  gap: 80px 120px;
  justify-content: center;
`;

const CardImg: any = styled("img")`
  min-width: 350px;
  min-height: 250px;
  border-radius: 15px;
`;

const ImageItemBar = styled(ImageListItemBar)`
  width: 100%;
  height: 50px;
  background: none;
`;

const ImageItemText = styled("p")`
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 25px;
  font-weight: 400;
  line-height: normal;
`;
