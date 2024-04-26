"use client"
import { styled } from "@mui/material";

import { BtnCratePrompt } from "@/app/Desktop/MarketingCoordinator/page";
import { BackIcon, PromptInput } from "@/app/Desktop/Student/AddNew";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function MobileAddPromptTable(props: any) {
    const [titles, setTitles] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [isCloseTable, setIsCloseTable] = useState(false);

    const handleCloseTable = () => {
        setIsCloseTable(props.closeTable);
      };

    const handleInputSubmit = (e: any) => {
          e.preventDefault();
          const blog = { titles, descriptions };
          console.log(blog);
      };

    return (
    <div>
        {isCloseTable == false && <TableContainer>
        <FormContainer>
          <FormContentContainer onChange={handleInputSubmit}>
            <button onClick={handleCloseTable} className="flex flex-row justify-between">
              <BackIcon />
              <TableTitle>Create a template</TableTitle>
              <CloseIcon/>
            </button>
            <PromptInput
              title="Title"
              isMultiline={false}
              event={(e: any) => setTitles(e.target.value)}
              value={titles}
              defaultValue={""}
            />
            <PromptInput
              title={"Description"}
              isMultiline={false}
              event={(e: any) => setDescriptions(e.target.value)}
              value={descriptions}
              defaultValue={""}
            />
            <BtnCratePrompt>Create New Prompt</BtnCratePrompt>
          </FormContentContainer>
        </FormContainer>
      </TableContainer>}
    </div>
    );
  }
  
  const TableContainer = styled("div")`
    display: flex;
    position: fixed;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  
  const FormContainer = styled("div")`
    border-radius: 30px;
    width: 80%;
    height: 95%;
    background: white;
    margin: auto;
    box-shadow: 0px 8px 15px 0px rgba(25, 33, 61, 0.1);
  `;
  const FormContentContainer = styled("form")`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  `;
  
  const TableTitle = styled("p")`
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  `;