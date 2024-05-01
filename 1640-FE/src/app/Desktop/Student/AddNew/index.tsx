"use client";

import {
  PromptBigContainer,
  CardPromptContainer,
  MenuPromptContainer,
  PromptPostTitle,
} from "../Prompt";

import {
  Button,
  Divider,
  IconButton,
  InputLabel,
  styled,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  InformationStyle,
  CardInformationContainer,
} from "../../manager/FacultyPost/Card";
import { useRef, useState } from "react";
//icon
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import CloseIcon from "@mui/icons-material/BackspaceTwoTone";
import cookie from "js-cookie";
import axios from "axios";
import { axiosPublic } from "@/app/lib/axios";

export default function AddNew(props: any) {
  const facultyID = cookie.get("facultyID");
  const userValue = cookie.get("userID");

  const [closeAddNew, setCloseAddNew] = useState(false);

  const [selectedCheckBox, setSelectedCheckBox] = useState(false);
  const fileInputRef = useRef(null);
  // const [docs, setFile] = useState([]);
  const [images, setImage] = useState<File[]>([]);
  const [contributionTitle, setContributionTitle] = useState(props.promptTitle);
  const [faculty, setFaculty] = useState(facultyID);
  const [statusID, setStatus] = useState("In review");
  const [userID, setUserID] = useState(userValue);
  const [description, setDescription] = useState("");
  const [docs, setDocs] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    if (description != "" && docs != null && selectedCheckBox == true) {
      // e.preventDefault()
      const url = `http://localhost:7000/api/submission`;

      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));

      if (document) {
        formData.append("docs", docs);
      }

      formData.append("description", description);
      formData.append("status", statusID);
      formData.append("contributionTitle", contributionTitle);
      formData.append("facultyID", faculty);
      formData.append("userID", userID);
      try {
        const res = axios.post(
          `http://localhost:7000/api/submission`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } catch (error) {}
    } else {
      e.preventDefault();
      alert("Error fill all info please");
    }
  };

  const handleCloseAddPage = () => {
    setCloseAddNew(props.closePage);
  };

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onImageSelect(e: any) {
    const files = e.target.files;
    if (files.length === 0) return;
    setImage(Array.from(e.target.files));
  }

  const onFileSelect = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setDocs(e.target.files[0]);
    }
  };

  function deleteFiles(index: any) {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function submitFile() {
    if (selectedCheckBox ) {
      if (images.length == 0 && docs == null) {
        alert("Error!! You do not add images and files");
      } else {
        setCloseAddNew(props.closePage);
      }
    } else {
      alert("Please!! Agree to the Term and Conditions upon submission");
    }
  }

  function handleCheckBox(e: any) {
    setSelectedCheckBox(e.target.checked);
    console.log(selectedCheckBox);
  }

  return (
    <PromptBigContainer className="absolute bg-white m-0">
      {closeAddNew == false && (
        <div className="flex flex-row w-[100%]">
          <MenuPromptContainer>
            <PromptPostTitle />
            <Divider variant="middle" color="#BCBCBC" />
          </MenuPromptContainer>
          <CardPromptContainer>
            <StudentCardTitle
              event={handleCloseAddPage}
              title={props.promptTitle}
              content={props.promptContent}
              time={props.promptTime}
              role={props.promptRole}
            />
            <form onSubmit={handleSubmit}>
              <PromptInput
                value={description}
                title="Title"
                defaultValue=""
                isMultiline={false}
                event={(e: any) => setDescription(e.target.value)}
              />
              <div className="flex flex-col">
                <StudentCardTitleContainer>
                  <AddStudentTitleStyle>Images</AddStudentTitleStyle>
                  {images.length == 0 && <InputLabel htmlFor="upImage" className="mb-2">
                    <Button
                      variant="outlined"
                      component="span"
                      onClick={selectFiles}
                    >
                      <TextInBtn>Choose a file</TextInBtn>
                    </Button>
                  </InputLabel>}
                  <TextField
                    type="file"
                    sx={{ display: "none" }}
                    id="upImage"
                    onChange={onImageSelect}
                    ref={fileInputRef}
                    name="images"
                    inputProps={{
                      accept: "image/png",
                    }}
                  />
                  <InputImageContainer className="flex flex-row gap-5">
                    {images.map((images, i) => (
                      <UploadFileContainer key={i}>
                        <BtnClose onClick={() => deleteFiles(i)}>
                          <CloseIcon />
                        </BtnClose>
                        {/* <CardImg src={images.url} alt={images.name} /> */}
                        {images.name}
                        <ArrowCircleDownOutlinedIcon className="" />
                      </UploadFileContainer>
                    ))}
                  </InputImageContainer>
                </StudentCardTitleContainer>
                <StudentCardTitleContainer>
                  <AddStudentTitleStyle>Docs</AddStudentTitleStyle>
                {docs == null && <InputLabel htmlFor="upFile" className="mb-2">
                    <Button
                      variant="outlined"
                      component="span"
                      onClick={selectFiles}
                    >
                      <TextInBtn>Choose a file</TextInBtn>
                    </Button>
                  </InputLabel>}
                  <TextField
                    type="file"
                    inputProps={{
                      accept: ".doc, .docx",
                    }}
                    sx={{ display: "none" }}
                    id="upFile"
                    onChange={onFileSelect}
                    ref={fileInputRef}
                  />
                  {docs != null && <InputImageContainer className="flex flex-row gap-5">
                    <UploadFileContainer>
                      <DescriptionOutlinedIcon />
                      {docs?.name}
                      <ArrowCircleDownOutlinedIcon className="" />
                    </UploadFileContainer>
                  </InputImageContainer>}
                </StudentCardTitleContainer>
                <CheckBoxContainer>
                  <CheckBox type="checkbox" onChange={handleCheckBox} />
                  <label>
                    {" "}
                    I agree to the
                    <a href=""> Term</a> and <a href="">Conditions </a>
                    upon submission.
                  </label>
                </CheckBoxContainer>
                <BtnSubmit>Submit</BtnSubmit>
              </div>
            </form>
          </CardPromptContainer>
        </div>
      )}
    </PromptBigContainer>
  );
}

export const PromptMenu = () => {
  return (
    <MenuPromptContainer>
      <PromptPostTitle />
      <Divider variant="middle" color="#BCBCBC" />
    </MenuPromptContainer>
  );
};

export const StudentCardTitle = ({
  event,
  title,
  content,
  time,
  role,
}: {
  event: any;
  title: string;
  content: string;
  time: string;
  role: string;
}) => {
  return (
    <div>
      <StudentCardTitleContainer
        onClick={event}
        className="flex flex-row gap-3"
      >
        <BackIcon />
        <div>
          <AddStudentTitleStyle>{title}</AddStudentTitleStyle>
          <AddStudentContentStyle>{content}</AddStudentContentStyle>
          <CardInformationContainer className="flex gap-[20px]">
            <div className="flex flex-row gap-[10px]">
              <CalendarTodayOutlinedIcon sx={{ color: "#666F8D" }} />
              <InformationStyle className="self-center">
                {time}
              </InformationStyle>
            </div>
            <div className="flex flex-row gap-[10px]">
              <AccountCircleOutlinedIcon sx={{ color: "#666F8D" }} />
              <InformationStyle className="self-center">
                {role}
              </InformationStyle>
            </div>
          </CardInformationContainer>
        </div>
      </StudentCardTitleContainer>
      <Divider variant="middle" color="#BCBCBC" />
    </div>
  );
};

export const StudentCardTitleContainer = styled("a")`
  margin: 10px 20px;
`;

const CardContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const BackIcon = styled(ArrowBackIcon)``;

export const BtnClose = styled(IconButton)`
  color: red;
`;

export const AddStudentTitleStyle = styled("p")`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

export const AddStudentContentStyle = styled("p")`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: #666f8d;
`;

export const TextInBtn = styled("p")`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const InputContent = styled(TextField)`
  width: 100%;
`;

export const CardImg = styled("img")`
  max-width: 200px;
  max-height: 200px;
  background-image: url(${"/images/SignInBg.png"});
`;

export const InputImageContainer = styled("div")`
  max-width: 90%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const BtnSubmit = styled("button")`
  width: 109px;
  height: 44px;
  border-radius: 10px;
  background: #489cff;
  align-self: self-end;
  margin: 30px;
`;

export const PromptInput = ({
  title,
  isMultiline,
  event,
  value,
  defaultValue,
}: {
  title: string;
  isMultiline: boolean;
  event: any;
  value: any;
  defaultValue: string;
}) => (
  <CardContentContainer>
    <AddStudentTitleStyle>{title}</AddStudentTitleStyle>
    <InputContent
      onChange={event}
      multiline={isMultiline}
      value={value}
      placeholder={defaultValue}
    />
  </CardContentContainer>
);

export const UploadFileContainer = styled("div")`
  max-width: 90%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #a4a4a4;
  display: flex;
  flex-direction: row;
  place-items: center;
  gap: 20px;
  padding: 0px 10px;
  color: #a4a4a4;
`;

export const CheckBox = styled("input")`
  min-width: 20px;
  min-height: 30px;
`;

export const CheckBoxContainer = styled("div")`
  min-width: 426px;
  max-height: 40px;
  margin: 30px;
  display: flex;
  gap: 10px;
  & label {
    align-self: center;
    font-size: 14px;
    font-style: italic;
    font-weight: 500;
  }
  & a {
    align-self: center;
    font-size: 14px;
    font-style: italic;
    font-weight: 500;
    color: #0085ff;
  }
`;
