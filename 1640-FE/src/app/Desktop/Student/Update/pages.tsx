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
import { useEffect, useRef, useState } from "react";
import { ViewStudentImage } from "../View/page";
import cookie from "js-cookie";
import axios from "axios";

interface apiSubmissions {
  _id: string;
  description: string;
  statusID: string;
  contributionID: string;
  facultyID: string;
  createdAt: string;
  fileID: string;
  userID: string;
}

export default function UpdatePromptPage(props: any) {
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();
  const [closeUpdateNew, setCloseUpdate] = useState(false);
  const [selectedCheckBox, setSelectedCheckBox] = useState(false);
  const fileInputRef = useRef(null);
  // const [docs, setFile] = useState([]);
  const [images, setImage] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [docs, setDocs] = useState<File | null>(null);

  const getSubmissions = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/submissions`, {
        method: "GET",
      });
      if (res.status != 200) {
        alert("Fail to connect server");
      } else {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (error) {
      alert("Fail to connect to server");
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  const handleUpdateSubmit = async (e: any) => {
    if (description != "" && docs != null && selectedCheckBox == true) {
      e.preventDefault();
      const param = props.submissionID;
      const url = `http://localhost:7000/api/submissions/`;
      const fetchURL = url.concat(param);
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));
      if (document) {
        formData.append("docs", docs);
      }
      formData.append("description", description);
      try {
        const res = axios.put(fetchURL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCloseUpdate(props.closePage);
      } catch (error) {
        alert("Fail");
      }
    } else {
      e.preventDefault();
      alert("Error fill all info please");
    }
  };

  const handleCloseUpdatePage = () => {
    setCloseUpdate(props.closePage);
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
    if (selectedCheckBox == true) {
      if (images.length == 0 && docs == null) {
        alert("Error!! You do not add images and files");
      } else {
        setCloseUpdate(props.closePage);
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
    <div>
      {closeUpdateNew == false && (
        <PromptBigContainer className="absolute bg-white m-0 w-full h-full">
          <PromptMenu />
          <CardPromptContainer>
            <StudentCardTitle
              event={handleCloseUpdatePage}
              title={props.title}
              content={props.content}
              time={props.time}
              role={"User"}
            />
            <form onSubmit={handleUpdateSubmit}>
              <PromptInput
                value={description}
                title="Description"
                isMultiline={true}
                event={(e: any) => setDescription(e.target.value)}
                defaultValue={props.description}
              />
              <div className="flex flex-col">
                <StudentCardTitleContainer>
                  <AddStudentTitleStyle>Images</AddStudentTitleStyle>
                  <InputLabel htmlFor="upImage" className="mb-2">
                    <Button
                      variant="outlined"
                      component="span"
                      onClick={selectFiles}
                    >
                      <TextInBtn>Choose a file</TextInBtn>
                    </Button>
                  </InputLabel>
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
                  <InputImageContainer className="flex flex-row gap-2">
                    {images.length > 0 &&
                      images.map((image, i) => (
                        <UploadFileContainer key={i}>
                        <BtnClose onClick={() => deleteFiles(i)}>
                            <CloseIcon />
                        </BtnClose>
                        {/* <CardImg src={images.url} alt={images.name} /> */}
                        {image.name}
                        <ArrowCircleDownOutlinedIcon className="" />
                        </UploadFileContainer>
                      ))}
                  </InputImageContainer>
                </StudentCardTitleContainer>
                <StudentCardTitleContainer>
                  <AddStudentTitleStyle>Docs</AddStudentTitleStyle>
                  <InputLabel htmlFor="upFile" className="mb-2">
                    <Button
                      variant="outlined"
                      component="span"
                      onClick={selectFiles}
                    >
                      <TextInBtn>Choose a file</TextInBtn>
                    </Button>
                  </InputLabel>
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
                  <InputImageContainer className="flex flex-row gap-2">
                    <UploadFileContainer>
                      <DescriptionOutlinedIcon />
                      <a href="">{docs?.name}</a>
                      <ArrowCircleDownOutlinedIcon className="" />
                    </UploadFileContainer>
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
                <BtnSubmit>Update</BtnSubmit>
              </div>
            </form>
          </CardPromptContainer>
        </PromptBigContainer>
      )}
    </div>
  );
}
