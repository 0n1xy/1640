"use client";

import { Stack, styled } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const chartSetting = {
    xAxis: [
      {
        label: 'post number',
      },
    ],
    width: 900,
    height: 600,
  };

const data = [
  {
    facultyName: "Total",
    numberOfPost: 184086,
  },
  {
    facultyName: "Business",
    numberOfPost: 102323,
  },
  {
    facultyName: "Development",
    numberOfPost: 10829,
  },
  {
    facultyName: "Design",
    numberOfPost: 506,
  },
  {
    facultyName: "Other",
    numberOfPost: 420,
  },
];

export default function AnalysisPage() {
  return (
    <CardAnalysisContainer>
      <Stack className="w-full">
        <BarChart
        sx={{paddingBottom: "60px"}}
          dataset={data}
          yAxis={[{ scaleType: "band", dataKey: "facultyName" }]}
          series={[{ dataKey: "numberOfPost" }]}
          layout="horizontal"
          {...chartSetting}
        />
      </Stack>
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
