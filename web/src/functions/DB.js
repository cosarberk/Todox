import axios from "axios";
import {  useSnackbar } from 'notistack';


const BASEURL = 'http://berkcosar.com:3005/todox/v1/'
//const BASEURL = process.env.BASEURL
const URLS ={
    control:BASEURL+'controlUserEmail/',
    login:BASEURL+'controlLoginrByuserAndPass',
    signup:BASEURL+'addUser',

    gettodo:BASEURL+'todos/',
    addtodo:BASEURL+'addTodo',
    puttodo:BASEURL+'putTodo/',
    deltodo:BASEURL+'delTodo/'
}


export default function Helper(){

    const { enqueueSnackbar } = useSnackbar();
      async function getUrlData(url,callback) {
      
        await axios.get(url)
        .then(response => response.data)
          .then((data) => {
             callback(data)
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
         
  
        }
  
      async function postUrlData(url,context,callback) {
        await  axios
        .post(url, context)
        .then((response) => {
          callback(response.data);
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
      }
  
      async function putUrlData(url,context,callback) {
       
        await  axios
        .put(url, context)
        .then((response) => {
          callback(response.data);
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
      }
  
      async function delUrlData(url,callback) {
       
        await  axios
        .delete(url)
        .then((response) => {
          callback(response.data);
        })
        .catch(error => {
          enqueueSnackbar('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', { variant: 'error' })
       });
      }
  
  
  
  
  function LoginControl(cont,callback) {
      postUrlData(URLS.login , cont,(res)=>{
      
         res.ok === 'no' ? enqueueSnackbar('Infos is false.', { variant: 'error' }) :  callback(res)
       
      })
    }

    function GetTodos(userid,callback){

        getUrlData(URLS.gettodo+userid,(res)=>{
        
         callback(res)
           
       })
      }

      function DelTodos(todoid,callback){

        delUrlData(URLS.deltodo+todoid,(res)=>{
        
         callback(res)
           
       })
      }

      function PutTodos(todoid,data,callback){

        putUrlData(URLS.puttodo+todoid,data,(res)=>{
        
         callback(res)
           
       })
      }
      function AddTodos(cont,callback) {
        postUrlData(URLS.addtodo , cont,(res)=>{
        
            callback(res)
         
        })
      }
  


      function userControl(email,callback){

        getUrlData(URLS.control+email,(res)=>{
        
         callback(res)
           
       })
      }
      function AddUser(cont,callback) {
        postUrlData(URLS.signup , cont,(res)=>{
        
            callback(res)
         
        })
      }


    return{
        LoginControl,GetTodos,DelTodos,PutTodos,AddTodos,userControl,AddUser
        }

}



