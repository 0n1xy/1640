
import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import FacultyPostCard from './Card';
import Divider from '@mui/material/Divider';

interface contributionApi {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: Date;
  contributionCloseDay: Date;
  submissionID: Date;
}

export default function FacultyPost() {
  const [contributions, setContributions] = useState<contributionApi[]>()

  const contributionsAPI = async () => {
    try {
      const res = await fetch('http://localhost:7000/api/contributions')
      if(res.ok) {
        const data = await res.json();
        console.log(data)
        setContributions(data)
      }
      
    } catch (error) {
      alert("Fail to connect server")
    }
  };
  
  useEffect(() => {
    contributionsAPI()
  }, [])
    return (
      <BigContainer>
      <PostTitle 
      title='Information of Technology'
      content='Description'
      />
      <Divider variant="middle" color="#BCBCBC"/>
      {contributions && contributions.length > 0 && contributions.map((contribution) => (
        <FacultyPostCard key={contribution._id} 
        title = {contribution.contributionTitle}
        time = {contribution.contributionStartDay} />
      ))}
      </BigContainer>
    );
}

export const PostTitle = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <FacultyPostTitle>
  <PostImg />
  <PostTitleContainer>
   <TitlePostContainer>
      <TitleStyle>
        {title}
      </TitleStyle>
    </TitlePostContainer>
     <ContentStyle>
      {content}
    </ContentStyle> 
  </PostTitleContainer>
  </FacultyPostTitle>
);

  
const BigContainer =styled("div")`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 800px;
  box-shadow:2px 0px 20px 0px rgb(124 124 124 / 47%),0px -1px 20px 0 rgb(255 253 253);
  border-radius: 0px 30px 30px 0px;
`

const FacultyPostTitle = styled("div")`
  display: flex;
  flex-direction: row;
  min-width: 70px;
  min-height: 70px;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
  gap: 10px;
  align-items: center;
`

const PostImg = styled("img")`
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background-image: url(${"/images/SignInBg.png"});
`

const PostTitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TitlePostContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 20px;
`

const TitleStyle = styled("p")`
  font-size: 18px;
  font-weight: 700;
  color: black;
`

const ContentStyle = styled("p")`
  font-size: 15px;
  font-weight: 500;
  color: #747474;
`
