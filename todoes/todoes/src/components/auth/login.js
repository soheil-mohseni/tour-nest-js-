import  React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SignUp.css";
import { useState } from "react";
import axios from "axios";


function Login(){




  const [enteredemail , setEnteredemail] = useState("");
  const [enteredpassword , setEnteredpassword] = useState("");
  const [loginresponse , setLoginresponse] = useState("");

  
  const emailOnChangeHandler = (event) => {
    setEnteredemail(event.target.value) ;
        };
  
  const PasswordOnChangeHandler = (event) => {
    setEnteredpassword(event.target.value) ;
      };
    


  const onSubmitHandler = async(event) => {
        
        event.preventDefault();
              

         const login =  await axios.post("http://localhost:3000/auth/signin", {
              email: enteredemail ,
              password: enteredpassword,

      });
       setLoginresponse(login)
      console.log(loginresponse)
   
              };
  


  return (
    <>
    <h1 className="signup_text">LOG IN</h1>
    <Box
      component="form"
      onSubmit={onSubmitHandler}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="signup">

            <TextField
              required
              id="outlined-required"
              label="User Name"
              defaultValue=""
              onChange={emailOnChangeHandler}
            />
            <br/>
              <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange= {PasswordOnChangeHandler}
            />
            <br/>
            <Button variant="contained" type= "submit" className="submit" >LOG IN</Button>

      </div>

    </Box>

   


    </>
  );
}


export default Login;