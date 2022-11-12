const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3001
const path = require('path')
const cors = require('cors')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.use(express.static('public'))
app.get('/', (request, response) => {
  
  response.json({ info: 'todox@berkcosar.com API SERVER is running' })
})
app.get('/_health', db.testDb)




app.get('/todox/v1/todos/:userid', db.getTodosByUserId)
app.post('/todox/v1/addTodo', db.addTodo)
app.put('/todox/v1/putTodo/:id', db.putTodo)
app.delete('/todox/v1/delTodo/:id', db.delTodo)

app.get('/todox/v1/controlUserEmail/:email', db.controlUserEmail)
app.post('/todox/v1/controlLoginrByuserAndPass', db.controlLoginrByuserAndPass)
app.post('/todox/v1/addUser', db.addUser)





app.listen(port, () => {
    console.log(`Todox Api Server running on port ${port}.`)
  })