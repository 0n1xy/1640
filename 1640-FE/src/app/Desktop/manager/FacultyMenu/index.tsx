'use client'
import { Button, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface apiFaculties {
  _id: string;
  facultyName: string;
}

export default function FacultyMenu() {
  const [search, setSearch] = useState('');
  const [currentFaculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState<apiFaculties[]>()

  const handleClickFaculty = (e: any) => {
    setFaculty("tab2");
    console.log(currentFaculty);
  }

  const handleSearch = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
    console.log(lowerCase);
  };

  const facultiesAPI = async () => {
    try {
      const res = await fetch('http://localhost:7000/api/faculties')
      const data = await res.json();
      setFaculties(data)
    } catch (error) {
      alert("Fail to connect server")
    }
  };

  useEffect(() => {
    facultiesAPI()
  }, [])
  {faculties && faculties.length > 0 && faculties.filter((faculty) => {
    return search.toLowerCase() === ' ' ? faculty : faculty.facultyName.toLowerCase().includes(search);
  }).map((faculty) => {
    <Card key={faculty._id} title={faculty.facultyName}
      content={faculty.facultyName}
      id={faculty._id}
      event={handleClickFaculty}
    />
  })}
  return (
    <>
    <div className='flex flex-row'>
      <BigContainer>
        <SearchBar event={handleSearch} content='Search find Faculty' />
        <Divider variant="middle" color="#BCBCBC" />
        <TitleStyle className='m-[10px]'>
          Faculties
        </TitleStyle>
        {faculties && faculties.length >0 && faculties.filter((faculty) => {
          return search.toLowerCase() === ' ' ? faculty : faculty.facultyName.toLowerCase().includes(search);
        }).map((faculty, i) => (
          <Card key={faculty._id} title={faculty.facultyName}
            content={faculty.facultyName}
            id={faculty._id}
            event={handleClickFaculty}
          />
        ))}
      </BigContainer>
    </div>
    </>
  );
}


export const SearchBar = ({
  content,
  event,
}: {
  content: string;
  event: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <SearchBarContainer>
    <SearchIcon />
    <SearchBarInput onChange={event} placeholder={content} />
  </SearchBarContainer>
);

export const Card = ({
  title,
  content,
  event,
  id
}: {
  title: string;
  content: string;
  event: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  id: string;
}) => (
  <CardContainer>
    <FacultyCard id={id} onClick={event}>
      <CardImg />
      <ContentCardContainer>
        <TitleCardContainer>
          <CardTitleStyle>
            {title}
          </CardTitleStyle>
          <ArrowForwardIcon />
        </TitleCardContainer>
        <ContentStyle>
          {content}
        </ContentStyle>
      </ContentCardContainer>
    </FacultyCard>
  </CardContainer>
);

const BigContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 800px;
  box-shadow: 1px 0px 7px 0px rgb(232 232 232), 0px 0px 20px 0 rgb(160 160 160 / 30%);
  border-radius: 30px 0px 0px 30px;
`

const SearchBarContainer = styled("div")`
  min-width: 300px;
  max-height: 50px;
  border: 1px solid #969696;
  padding: 0px 50px;
  margin: 20px;
  border-radius: 30px;
  align-items: center;
  display: flex;
  gap: 20px
`

const SearchBarInput = styled("input")`
  min-width: 200px;
  min-height: 40px;
  border: 0px;
  &:focus{
    outline: none;
  }
`

const FacultyCard = styled("button")`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 70px;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  place-content: flex-start;
}
`

const CardImg = styled("img")`
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background-image: url(${"/images/SignInBg.png"});
`

const TitleStyle = styled("p")`
  font-size: 28px;
  font-weight: 700;
  color: black;
`

const ContentCardContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TitleCardContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 20px;
`

const CardTitleStyle = styled("p")`
  font-size: 18px;
  font-weight: 700;
  color: black;
`

const ContentStyle = styled("p")`
  font-size: 15px;
  font-weight: 500;
  color: #747474;
  align-self: start;
`
const CardContainer = styled("div")`
  display: flex;
  min-width: 70px;
  min-height: 70px;
  border: 1px solid #969696;
  border-radius: 10px;
  place-content: flex-start;
  margin: 10px;
  & :focus{
    border: 1px solid #0085FF;
  }
`
