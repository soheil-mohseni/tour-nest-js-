import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./auth/SignUp.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import AddWork from "./addwork/addwork";
import DeleteIcon from "@mui/icons-material/Delete";

function Todolist(props) {
  const [fetchdata, setfetchdata] = useState();

  useEffect(() => {
    workresponse();
  }, []);

  const workresponse = async () => {
    const ct = await axios("http://localhost:3000/auth/getexpense", {
      method: "get",
      withCredentials: true,
    });
    setfetchdata(ct.data);
  };

  //   console.log();(workresponse)

  return (
    <div>
      <AddWork  Onreload={workresponse}/>

      {fetchdata &&
        fetchdata.map((work, index) => (
          <div>
            <Box
              sx={{
                width: 550,
                height: 65,
                borderRadius: "20px",
                backgroundColor: "primary.dark",
                marginTop: "33px",
                marginLeft: "600px",
                position: "absolute",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Checkbox
                //       checked={checked}
                //         onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                sx={{
                  paddingTop: "10px",
                  background: "black",
                  marginLeft: "11px",
                  marginTop: "8px",
                }}
              />
              <h2
                key={work.toString()}
                style={{
                  display: "inline",
                  position: "relative",
                  top: "11px",
                  left: "11px",
                }}
              >
                {work.title}
              </h2>
            </Box>
            <br></br><br></br><br></br><br></br>
          </div>
        ))}
    </div>
  );
}

export default Todolist;
