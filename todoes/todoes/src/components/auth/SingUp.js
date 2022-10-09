import  React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';




function SignUp(){



  const [enteredname , setEnteredname] = useState("");
  const [enteredphone , setEnteredphone] = useState("");
  const [enteredemail , setEnteredemail] = useState("");
  const [enteredpassword , setEnteredpassword] = useState("");
  const [signupresponse , setSignupresponse] = useState("");



  const NameOnChangeHandler = (event) => {
    setEnteredname(event.target.value) ;
    };
  
  
  const PhoneOnChangeHandler = (event) => {
    setEnteredphone(event.target.value) ;
      };
  
  const emailOnChangeHandler = (event) => {
    setEnteredemail(event.target.value) ;
        };
  
  const PasswordOnChangeHandler = (event) => {
    setEnteredpassword(event.target.value) ;
      };
    


  const onSubmitHandler = async(event) => {
        
        event.preventDefault();


       const signup =  axios("http://localhost:3000/auth/signup", {
          method: "post",
          data: {
            email: enteredemail,
            password: enteredpassword,
            name: enteredname,
            phone: enteredphone,},
            withCredentials: true
        })

     setSignupresponse(signup)
        return(<Navigate to="/todo" />)
    };
        
    const navigate = useNavigate();

  return (
    <>
    <h1 className="signup_text">SIGN UP</h1>
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
              label="Name"
              defaultValue=""
              onChange={NameOnChangeHandler}
            />

            <br/>
            <TextField
              required
              id="outlined-required"
              label=" phone Number"
              defaultValue=""
              onChange={PhoneOnChangeHandler}
            />
            <br/>
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
            <Button variant="contained" type= "submit" className="submit" }>SIGN UP</Button>

      </div>

    </Box>
    </>
  );
}


export default SignUp ;