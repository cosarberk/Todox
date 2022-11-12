import React from 'react'
import Box from '@mui/material/Box'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import  Typography  from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function TodoCard({date,title,text,color,onDelete,onEdit}) {
  return (
    <Box sx={{display:'flex',flexDirection:'row',backgroundColor:color,broderRadius:2,alignItems:'center',justifyContent:'space-between',marginTop:1,borderRadius:2}} >
    <Box sx={{display:'flex'}} >
    <Box sx={{alignItems:'center',display:'flex',margin:2}} >
   <CalendarMonthIcon color="action" />
   </Box>
   
    <Box sx={{display:'flex',flexDirection:'column',marginRight:2}} >
    <Typography> {title} </Typography>
    <Typography variant='subtitle2' > {text} </Typography>
    </Box>
    </Box>
    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}} >
    <Typography mr={1} variant='body2' > {date} </Typography>
    <IconButton onClick={onEdit} variant="contained" aria-label="edit" size="large">
        <EditIcon fontSize="inherit" />
      </IconButton>
    <IconButton onClick={onDelete} variant="contained" aria-label="delete" size="large">
        <DeleteOutlineIcon fontSize="inherit" />
      </IconButton>
    </Box>
   
</Box>
  )
}
