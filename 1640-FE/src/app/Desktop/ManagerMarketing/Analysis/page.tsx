"use client";

import { FormControl, MenuItem, Select, Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";;

interface apiSubmissions {
  _id: string;
  description: string;
  facultyID: string;
  createdAt: string;
  userID: string;
  statusID: string;
  fileID: string;
  contributionID: string;
}

interface contributionApi {
  _id: string;
  contributionTitle: string;
  contributionStatus: boolean;
  contributionStartDay: Date;
  contributionCloseDay: Date;
  submissionID: string;
}

export default function AnalysisPage() {
  const [submissions, setSubmissions] = useState<apiSubmissions[]>();
  const [contributions, setContributions] = useState<contributionApi[]>();
  const [contributionID, setContributionID] = useState(
    "b6f71de5-4207-4e28-af55-dbb33a629588"
  );

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

  const contributionsAPI = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/contributions");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setContributions(data);
      }
    } catch (error) {
      alert("Fail to connect server");
    }
  };

  useEffect(() => {
    getSubmissions();
    contributionsAPI();
  }, []);

  const handleChange = (e: any) => {
    setContributionID(e.target.value);
  };

  return (
    <CardAnalysisContainer>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          value={contributionID}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {contributions?.map((contribution) => (
            <MenuItem key={contribution._id} value={contribution._id}>
              {contribution.contributionTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {contributions?.map((contribution) => (
        <div key={contribution._id}>
          {contributionID === `${contribution._id}` && (
            <Chart contributionID={contribution._id} />
          )}
        </div>
      ))}
    </CardAnalysisContainer>
  );
}

const CardAnalysisContainer = styled("div")`
  margin: 20px 40px;
  min-width: 1150px;
  min-height: 889px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  padding: 30px;
`;

function Chart(props: any) {
  const [analysis, setAnalysis] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  const getAnalysis = async () => {
    const url = `http://localhost:7000/api/analysis/`;
    const ID = props.contributionID;
    const fetchURL = url.concat(ID);
    try {
      const res = await fetch(fetchURL, {
        method: "GET",
      });
      const data = await res.json();
      const sum = data.reduce((acc, item) => acc + item.submissionCount, 0);
      setTotalSum(sum);
      setAnalysis(data);
      console.log(fetchURL);
    } catch (error) {
      alert("Don't have any submission");
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  const chartSetting = {
  yAxis: [
    {
      label: "submissions's number",
    },
  ],
  width: 1000,
  height: 600,
};

  return (
    <div>
      <Stack className="w-full">
        <TitleTxt>Total submission: {totalSum}</TitleTxt>
        <BarChart
          sx={{ paddingBottom: "60px" }}
          dataset={analysis}
          xAxis={[{ scaleType: "band", dataKey: "facultyName" }]}
          series={[{ dataKey: "submissionCount" }]}
          {...chartSetting}
/>
      </Stack>
    </div>
  );
}

const TitleTxt = styled("p")`
  color: #000;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  align-self: center;
`
