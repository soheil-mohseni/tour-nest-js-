import  React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../auth/SingUp";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";


function AddWork(props){




  const [enteredtitle , setEnteredtitle] = useState("");
  const [addworkresponse , setaddworkresponse] = useState("");


  const addworkOnChangeHandler = (event) => {
    setEnteredtitle(event.target.value);
           };

  const onSubmitHandler = async(event) => {
    
  
    event.preventDefault();

    const addworkresponse =  axios("http://localhost:3000/auth/createxpense", {
      method: "post",
      data: {
        title: enteredtitle,},
      withCredentials: true
    })

                  };



  return (
    <>


    <Box
      component="form"
      onSubmit={onSubmitHandler}
      sx={{
        width: "550px",
        borderRadius: '20px' ,
        marginTop: '200px' , 
        marginLeft: '600px' 
      }}
      noValidate
      autoComplete="off"
    >

   
      <TextField
        required
        id="outlined-required"
        label="ADD WORK"
        defaultValue=""
        onChange={addworkOnChangeHandler}
        sx={{width: "550px"}}
  >
              </TextField>
      <Button variant="contained" type= "submit" className="submit"  onClick={props.Onreload()}>SUBMIT</Button>

   </Box>
   </>
  );
}


export default AddWork;