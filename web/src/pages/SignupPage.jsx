import React from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import DB from '../functions/DB'
import {  useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";

var md5 = require('md5')



export default function SignupPage() {

  const { enqueueSnackbar } = useSnackbar();
  const {userControl,AddUser} = DB()
  const navigate = useNavigate(); 



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
    const email = data.get("email")
    const pass = data.get("password")
  
    
     if (email === '' || pass === ''){
      enqueueSnackbar('Please fill in the blanks.', { variant: 'warning' })
     }else{


     userControl(email,(res)=>{
      if(res.ok=="no"){
        let userinfo ={
          email:email,
          pass:md5(pass)
         }
         AddUser(userinfo,(res)=>{
          if (res.ok=='ok') {
            enqueueSnackbar('Signup successfull.', { variant: 'success' })
            navigate("/");
          }else{
            enqueueSnackbar('Signup unsuccessfull.', { variant: 'error' })
          }
         })
      }else{
        enqueueSnackbar('Such a user already exists.', { variant: 'warning' })
      }
     })






   

     }
  

  };

  



  return (
    <BaseLayout>
    <Container component="main" maxWidth="xs">
    
    
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <AssignmentIndIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      Todox  Signup
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Şifre"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Signup
        </Button>
       
      </Box>
 
    </Box>
    </Container>
    </BaseLayout>
  )
}
