import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

import Student from "../students/Student";
import StudentDetails from "../students/StudentDetails";
import User from "../user/User";
import UserDetails from "../user/UserDetails";

const MuiTab: React.FC<{
  children: any;
  value: Number;
  index: Number;
}> = (props): JSX.Element => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

MuiTab.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  const [studentId, setStudentId] = React.useState<Number>(0);

  const handleClick = (studentId: Number) => {
    setStudentId(studentId);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange1 = (event: { target: { checked: any } }) => {
    const isCheck = event.target.checked;
    setChecked(isCheck);
    console.log(isCheck);
    // handle onClick of Refresh button in here
    if (isCheck) {
      // call api fetch('Yes')
    } else {
      // call api fetch('No')
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "30%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Checkbox checked={checked} onChange={handleChange1} />
      </div>
      <MuiTab value={value} index={0}>
        <div
          style={{ padding: 20, width: "30%", borderRight: "2px solid white" }}
        >
          <Student setStudentId={handleClick} />
        </div>
        <div style={{ padding: 20, width: "70%" }}>
          <StudentDetails studentId={studentId} />
        </div>
      </MuiTab>
      <MuiTab value={value} index={1}>
        <div
          style={{ padding: 20, width: "30%", borderRight: "2px solid white" }}
        >
          <User setUserId={handleClick} />
        </div>
        <div style={{ padding: 20, width: "70%" }}>
          <UserDetails userId={studentId} />
        </div>
      </MuiTab>
      <MuiTab value={value} index={2}>
        Item Three
      </MuiTab>
    </Box>
  );
}
