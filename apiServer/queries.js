

// create .env file and add infos

//
//      DB_USER=postgres
//      DB_PASS= <YOUR_DB_PASSWORD>
//      DB_NAME= <YOUR_DB_NAME>
//      DB_HOST= <YOUR HOSTNAME OR IP ADRESS>
//      DB_PORT=5432
//
//








const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})



const testDb  = (request, response) => {
    pool.query('SELECT 1 + 1 as result', (error, results) => {
      if (error) {
	      console.error(error)
	 return  response.status(500).json({error: "Cannot connect"})
    //     throw error
      }
      response.status(200).json({dbUp: results.rows[0].result == 2})
    })
  }

  const getTodosByUserId = (request, response) => {
    const userid = parseInt(request.params.userid)
  
    pool.query('SELECT * FROM todos WHERE userid = $1', [userid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const addTodo = (request, response) => {
    const {userid,todo_title,todo_text,todo_date,todo_color} = request.body
  
    pool.query('INSERT INTO todos (userid,todo_title,todo_text,todo_date,todo_color) VALUES  ($1, $2,$3,$4,$5)', [userid,todo_title,todo_text,todo_date,todo_color], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).json({ok:'ok'})
    })
  }
  const putTodo = (request, response) => {
    const id = parseInt(request.params.id)
    const { todo_title,todo_text,todo_date,todo_color} = request.body
    pool.query(
      'UPDATE todos SET todo_title = $1, todo_text = $2 , todo_date = $3, todo_color = $4  WHERE id = $5',
      [ todo_title,todo_text,todo_date,todo_color, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json({ok:'ok'})
      }
    )
  }
  const delTodo = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM todos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({ok:'ok'})
    })
  }
 

  const addUser = (request, response) => {
    
    const {email,pass}= request.body
    pool.query('INSERT INTO users (email,pass) VALUES ($1,$2)', [email,pass], (error, results) => {
      if (error) {
        throw error
      }
      results.rowCount>0 ? response.status(200).json({ok:'ok'}) : response.status(200).json({ok:'no'})
   
    })
  }

  const controlLoginrByuserAndPass = (request, response) => {
    
    const {email,pass}= request.body
    pool.query('SELECT * FROM users WHERE email = $1 AND pass = $2', [email,pass], (error, results) => {
      if (error) {
        throw error
      }
      results.rowCount>0 ? response.status(200).json(results.rows) : response.status(200).json({ok:'no'})
   
    })
  }

  const controlUserEmail = (request, response) => {
    
    const email = request.params.email
   
    pool.query('SELECT email FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      results.rowCount>0 ? response.status(200).json({ok:'ok'}) : response.status(200).json({ok:'no'})
   
    })
  }
 



  module.exports = {
    testDb,controlLoginrByuserAndPass,controlUserEmail,
    addTodo,putTodo,delTodo,getTodosByUserId,addUser
  }