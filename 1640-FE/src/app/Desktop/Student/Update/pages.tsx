"use client";

import { Button, InputLabel, TextField, styled } from "@mui/material";
import { PromptBigContainer, CardPromptContainer } from "../Prompt";
import {
  AddStudentTitleStyle,
  BtnClose,
  BtnSubmit,
  CardImg,
  CheckBox,
  CheckBoxContainer,
  InputImageContainer,
  PromptInput,
  PromptMenu,
  StudentCardTitle,
  StudentCardTitleContainer,
  TextInBtn,
  UploadFileContainer,
} from "../AddNew";

//icon
import CloseIcon from "@mui/icons-material/BackspaceTwoTone";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import { useRef, useState } from "react";
import { ViewStudentImage } from "../View/page";

export default function UpdatePromptPage(props: any) {
  const [titles, setTitles] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [closeUpdate, setCloseUpdate] = useState(false);
  
  const [title, setContributionTitle] = useState("");
  const [status, setContributionStatus] = useState("");
  const [startDay, setContributionStartDay] = useState("");
  const [closeDay, setContributionCloseDay] = useState("");

  const [inputValues, setInputValues] = useState({
    contributionTitle: props.promptTitle,
    faculty: props.contributionTitle,
    status: "In review",
  });

  const handleUpdateSubmit = (e: any) => {
    if (titles != "" && descriptions != "") {
      e.preventDefault();
      const blog = { titles, descriptions, inputValues};
      console.log(blog);
    } else {
      e.preventDefault();
      alert("Error fill all info please");
    }
  };

  const handleClosePost = () => {
    setCloseUpdate(props.closePage);
  };

  return (
    <div>
      {closeUpdate == false && (
        <PromptBigContainer className="absolute bg-white m-0 w-full h-full">
          <PromptMenu />
          <CardPromptContainer>
            <StudentCardTitle
              event={handleClosePost}
              title={props.title}
              content={props.content}
              time={props.time}
              role={"User"}
            />
            <form onSubmit={handleUpdateSubmit}>
              <PromptInput
                value={descriptions}
                title="Description"
                isMultiline={true}
                event={(e: any) => setDescriptions(e.target.value)}
                defaultValue={props.descriptions}
              />
              <UpdateStudent
                postImage={props.postImage}
                postFile={props.postFile}
              />
            </form>
          </CardPromptContainer>
        </PromptBigContainer>
      )}
    </div>
  );
}

export const UpdateStudent = (props: any) => {
  const imgData = props.postImage;
  const fileData = props.postFile;

  const [selectedCheckBox, setSelectedCheckBox] = useState(false);
  const fileInputRef = useRef(null);
  const [files, setFile] = useState([/*...fileData*/]);
  const [images, setImage] = useState([/*...imgData*/]);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onImageSelect(e: any) {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") {
        alert("Please select a PDF file.");
        return;
      }
      if (!images.some((e: any) => e.name === files[i].name)) {
        setImage((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  const onFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    // Check if the selected file is a PDF
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }
    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split(".")[1]}`
        : file.name;

    const formData = new FormData();
    formData.append("file", file);
    setFile((prevState) => [...prevState, { name: fileName }]);
  };

  function deleteFiles(index: any) {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function submitFile() {
    if (selectedCheckBox == true) {
      if (images.length == 0 && files.length == 0) {
        alert("Error!! You do not add images and files");
      } else if (images.length == 0) {
        alert("Error!! You do not add images");
      } else if (files.length == 0) {
        alert("Error!! You do not add files");
      } else {
        console.log("Image:", images);
        console.log("File:", files);
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
    <div className="flex flex-col">
      <StudentCardTitleContainer>
        <AddStudentTitleStyle>Images</AddStudentTitleStyle>
        <InputLabel htmlFor="upImage" className="mb-2">
          <Button variant="outlined" component="span" onClick={selectFiles}>
            <TextInBtn>Choose a file</TextInBtn>
          </Button>
        </InputLabel>
        <TextField
          type="file"
          sx={{ display: "none" }}
          id="upImage"
          onChange={onImageSelect}
          ref={fileInputRef}
        />
        <InputImageContainer className="flex flex-row gap-5">
          {images.map((item, i) => (
            <div key={i} className="relative">
              <BtnClose onClick={() => deleteFiles(i)}>
                <CloseIcon />
              </BtnClose>
              <CardImg src={item.url} alt={item.name} />
              <ViewStudentImage src={item.src} key={item.imageId} />
            </div>
          ))}
        </InputImageContainer>
      </StudentCardTitleContainer>
      <StudentCardTitleContainer>
        <AddStudentTitleStyle>Docs</AddStudentTitleStyle>
        <InputLabel htmlFor="upFile" className="mb-2">
          <Button variant="outlined" component="span" onClick={selectFiles}>
            <TextInBtn>Choose a file</TextInBtn>
          </Button>
        </InputLabel>
        <TextField
          type="file"
          inputProps={{ accept: "application/pdf" }}
          sx={{ display: "none" }}
          id="upFile"
          onChange={onFileSelect}
          ref={fileInputRef}
        />
        <InputImageContainer className="flex flex-row gap-5">
          {files.map((item, i) => (
            <UploadFileContainer key={i}>
              <DescriptionOutlinedIcon />
              {item.name}
              {item.file}
              <ArrowCircleDownOutlinedIcon className="" />
            </UploadFileContainer>
          ))}
        </InputImageContainer>
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
      <BtnSubmit onClick={submitFile}>Submit</BtnSubmit>
    </div>
  );
};
