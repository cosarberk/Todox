import React,{useState} from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import DB from '../functions/DB'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {  useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

export default function AddTodoPage() {
  const { enqueueSnackbar } = useSnackbar();
  const storage = useLocalStorage('user')[0]
  const userID =storage.id
  const {AddTodos} = DB();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const todo_title = data.get("todo_title")
    const todo_text = data.get("todo_text")
  
    
     if (todo_title === '' || todo_text === ''){
      enqueueSnackbar('Please fill in the blanks.', { variant: 'warning' })
     }else{
      const date = new Date()
      let dd = String(date.getDate()).padStart(2, '0'),
          mm = String(date.getMonth() + 1).padStart(2, '0'),
          yyyy = date.getFullYear(),
          today = mm + '-' + dd + '-' + yyyy,
          color= Math.floor(Math.random() * 999999) + 100000
           
      let todoinfo ={
        userid:userID,
        todo_title:todo_title,
        todo_text:todo_text,
        todo_date:today,
        todo_color:'#'+color
       }
       AddTodos( todoinfo,(res)=>{
        if(res.ok=='ok'){
          enqueueSnackbar('Note save successfully.', { variant: 'success' })
          navigate("/Todox/Todos");
        }else{
          enqueueSnackbar('Note is not save.', { variant: 'error' })
        }
       })

     }
  
  
  };
  



  return (
    <Container maxWidth="sm" >
    <Typography align='center' variant="h4" component="h2">
        ADD TODO 
      </Typography>
<Box component="form" onSubmit={handleSubmit} noValidate >
<TextField
      margin="normal"
      required
      fullWidth
      id="todo_title"
      label="Title"
      name="todo_title"
      autoComplete="todo_title"
      autoFocus
    />

<TextField
      margin="normal"
      required
      fullWidth
      id="todo_text"
      label="Text"
      name="todo_text"
      autoComplete="todo_text"
      autoFocus
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Save
    </Button>

</Box>


    </Container>
  )
}
