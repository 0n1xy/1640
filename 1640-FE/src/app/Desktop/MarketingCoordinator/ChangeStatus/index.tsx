import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PromptInput } from "../../Student/AddNew";
import { BtnCratePrompt } from "../page";
//icon
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface apiStatus {
  _id: string;
  statusName: string;
}

export default function ChangeStatus(props: any) {
  const [isClose, setIsClose] = useState(false);
  const [status, setStatus] = useState<apiStatus[]>();
  const [handleStatus, setHandleStatus] = useState("In Review");
  const [comment, setComment] = useState("");

  const getStatus = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/status`, {
        method: "GET",
      });
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      alert("Fail to connect to server");
    }
  };  

  const handleUpdateSubmit = async(e: any) => {
    if (comment != "" ) {
      e.preventDefault();
      const blog = { handleStatus, comment};
      console.log(blog);
      const param = props.submissionID
      const url = `http://localhost:7000/api/submission/`
      const fetchURL = url.concat(param)
      try {
        const res = await fetch(fetchURL, {
        method: "PATCH",
      });
      setIsClose(props.closePage);
      window.location.reload();
      } catch (error) {
        
      }
    } else {
      e.preventDefault();
      alert("Error fill all info please");
    }
  };

  const handleChange = (e) => {
      setHandleStatus(e.target.value)
  }

  const handleClickClose = () => {
    setIsClose(props.closePage);
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div>
      {isClose == false && (
        <TableContainer>
          <FormContainer>
            <FormContentContainer>
              <button
                onClick={handleClickClose}
                className="flex flex-row justify-between"
              >
                <ArrowBackIcon />
                <TableTitle>Check Status</TableTitle>
                <CloseIcon />
              </button>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="grouped-select">Status</InputLabel>
                <Select onChange={handleChange} defaultValue="" id="grouped-select" label="Grouping">
                  {status?.map((item) => (
                    <MenuItem value={item.statusName} key={item._id}> {item.statusName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <PromptInput
                title={"Comment"}
                isMultiline={true}
                event={(e: any) => setComment(e.target.value)}
                value={comment}
                defaultValue={""}
              />
              <BtnCratePrompt onClick={handleUpdateSubmit}>
                confirm
              </BtnCratePrompt>
            </FormContentContainer>
          </FormContainer>
        </TableContainer>
      )}
    </div>
  );
}

const TableContainer = styled("div")`
  display: flex;
  position: fixed;
  width: 50%;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormContainer = styled("div")`
  border-radius: 30px;
  width: 60%;
  height: 95%;
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

const TableContent = styled("p")`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;
