
import { useRouter } from "next/navigation";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";

//icon
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BtnCratePrompt } from "../MarketingCoordinator/page";
import { AddStudentTitleStyle } from "../Student/AddNew";

export default function AdminPage(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setContributionTitle] = useState("");
  const [status, setContributionStatus] = useState("");
  const [startDay, setContributionStartDay] = useState("");
  const [closeDay, setContributionCloseDay] = useState("");
  const router = useRouter();

  const handleUpdateSubmit = async (e: any) => {
    if (title != "") {
      e.preventDefault();
      const blog = {
        title,
        status,
        startDay,
        closeDay,
      };
      console.log(blog);
      const url = `http://localhost:7000/api/contribution`
      const fetchURL = url
      try {
        const res = await fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog)
      });
      setIsOpen(props.closePage);
      window.location.reload();
      } catch (error) {
        alert("Fail to connect server")
      }
    } else {
      e.preventDefault();
      alert("Error fill all info please");
    }
    
  };

  const handleClickOpen = () => {
    setIsOpen(props.closePage);
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setContributionStatus(event.target.value);
  };

  return (
        <TableContainer>
          <FormContainer>
            <FormContentContainer>
              <button
                onClick={handleClickOpen}
                className="flex flex-row justify-between "
              >
                <ArrowBackIcon />
                <TableTitle>Create a Contribution</TableTitle>
                <CloseIcon />
              </button>
              <div className="max-h-[450px] text-align: center">
                <PromptInput
                  title="Contribution Title"
                  isMultiline={false}
                  event={(e: any) => setContributionTitle(e.target.value)}
                  value={title}
                  defaultValue={""}
                  type="text"
                />
                <AddStudentTitleStyle className="ml-[20px]">Status</AddStudentTitleStyle>
                <FormControl sx={{ marginLeft:"20px", minWidth: "95%" }}>
                  
                  <Select onChange={handleSelect} >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Close">Close</MenuItem>
                  </Select>
                </FormControl>
                <PromptInput
                  title={"Contribution StartDay"}
                  isMultiline={false}
                  event={(e: any) => setContributionStartDay(e.target.value)}
                  value={startDay}
                  defaultValue={""}
                  type="date"
                />
                <PromptInput
                  title={"Contribution CloseDay"}
                  isMultiline={false}
                  event={(e: any) => setContributionCloseDay(e.target.value)}
                  value={closeDay}
                  defaultValue={""}
                  type="date"
                />
              </div>

              <BtnCratePrompt onClick={handleUpdateSubmit}>
                Create New Contribution
              </BtnCratePrompt>
            </FormContentContainer>
          </FormContainer>
        </TableContainer>
  );
}

const TableContainer = styled("div")`
  margin: 20px 80px;
  width: 60%; 
`;

const FormContainer = styled("div")`
  border-radius: 30px;
  width: 100%;
  height: 100%;
  background: white;
  margin: auto;
  box-shadow: 0px 8px 15px 0px rgba(25, 33, 61, 0.1);
`;

const FormContentContainer = styled("div")`
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

export const PromptInput = ({
  title,
  isMultiline,
  event,
  value,
  defaultValue,
  type,
}: {
  title: string;
  isMultiline: boolean;
  event: any;
  value: any;
  defaultValue: string;
  type: string;
}) => (
  <CardContentContainer>
    <AddStudentTitleStyle>{title}</AddStudentTitleStyle>
    <InputContent
      onChange={event}
      multiline={isMultiline}
      value={value}
      placeholder={defaultValue}
      type={type}
    />
  </CardContentContainer>
);

const CardContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const InputContent = styled(TextField)`
  width: 100%;
`;
