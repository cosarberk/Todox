import React,{useState,useEffect} from 'react'
import TodoCard from '../components/TodoCard'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import DB from '../functions/DB'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {  useSnackbar } from 'notistack';
import Skeleton from '@mui/material/Skeleton';

const Modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function MainPage() {

  const { enqueueSnackbar } = useSnackbar();
  const storage = useLocalStorage('user')[0]
  const userID =storage.id
  const [todos,setTodos]=useState([])
  const [selectedNote,setSelectedNote]=useState(undefined)
  const {GetTodos,DelTodos,PutTodos} = DB()
  const [openModal, setOpenModal] = useState(false);
  const [loading, setloading] = useState(true);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

function DelTodo(todoid) {
  DelTodos(todoid,(res)=>{
    if(res.ok=='ok'){
      enqueueSnackbar('Note deleted successfully.', { variant: 'success' })
    }else{
      enqueueSnackbar('Note is not delete.', { variant: 'error' })
    }
    
  })
}

function UpdateTodo(t) {
  setSelectedNote(t)
  handleOpen()
}

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
        today = mm + '-' + dd + '-' + yyyy;

    let todoinfo ={
      todo_title:todo_title,
      todo_text:todo_text,
      todo_date:today,
      todo_color:selectedNote.todo_color
     }
     PutTodos(selectedNote.id, todoinfo,(res)=>{
      if(res.ok=='ok'){
        enqueueSnackbar('Note update successfully.', { variant: 'success' })
      }else{
        enqueueSnackbar('Note is not update.', { variant: 'error' })
      }
     })
     handleClose()
   }


};


useEffect(()=>{
 
   GetTodos(userID,(res)=>{
    setloading(true)
    if(res){
      setTodos(res)
      setloading(false)
    }
   
   })


},[todos])

  
  return (
    <Container maxWidth="sm" >
           <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ ...Modalstyle, width: 400 }}>
          <h2 id="parent-modal-title">Update Note</h2>
         
          <TextField
      margin="normal"
      required
      fullWidth
      defaultValue={selectedNote && selectedNote.todo_title}
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
      defaultValue={selectedNote && selectedNote.todo_text}
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
     Update
    </Button>

        </Box>
      </Modal>
      <Typography align='center' variant="h4" component="h2">
        TODO LIST
      </Typography>


    {

  loading ?   <Box>
<Skeleton sx={{marginTop:1}} animation="wave" variant="rounded"  height={60} />
<Skeleton sx={{marginTop:1}} animation="wave" variant="rounded"  height={60} />
<Skeleton sx={{marginTop:1}} animation="wave" variant="rounded"  height={60} />
</Box>

:

<Box>
  
{todos.length>0 && todos.map((t,i)=>{
  return(
    <React.Fragment key={i} >
       <TodoCard onEdit={()=>UpdateTodo(t)} onDelete={()=>DelTodo(t.id)} color={t.todo_color} title={t.todo_title} text={t.todo_text} date={t.todo_date} />
    </React.Fragment>
  
  )
}) }
</Box>
    }  



    </Container>
  
  )
}
