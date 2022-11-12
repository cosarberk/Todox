import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../hooks/useAuth";
import DB from '../functions/DB'
import {  useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
var md5 = require('md5')



export const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const {LoginControl} = DB()
  const navigate = useNavigate(); 



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
    const email = data.get("email")
    const pass = data.get("password")
  
    
     if (email === '' || pass === ''){
      enqueueSnackbar('Please fill in the blanks.', { variant: 'warning' })
     }else{
      let userinfo ={
        email:email,
        pass:md5(pass)
       }
       LoginControl(userinfo,(res)=>{
        if (res[0]) {
          login({id:res[0].id  });
          enqueueSnackbar('Login successfull.', { variant: 'success' })
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
    <LockOutlinedIcon />
  </Avatar>
  <Typography component="h1" variant="h5">
  Todox  Login
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
      Login
    </Button>
   
  </Box>
  <Button
      onClick={()=> navigate("Signup")}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Signup
    </Button>
</Box>
</Container>
</BaseLayout>

  );
};