import{IMG_PATH,DISCOVER,SEARCH_URL,POPULARITY,COUNTRY,YEAR,GENRE,ACTOR,RATE}from './basics/variables.js';
import {API_KEY,fetchDiscover,fetchUsers,fetchSearch} from './api.js';
import {addNewUser,registration ,checker,checkUserInput,signIn,logout,loginLogout,loginButtonFunc} from './LoginRegister.js';
import {browseSearchFunc, removeTag} from './browse/textInputFuncs.js';
import{favCount} from './basics/functions.js';
const inputMovieForm=document.querySelector(".input-movie-form");


browseSearchFunc();
// if(document.querySelectorAll(".movie")!==null){
//     document.querySelectorAll(".movie").forEach(element => {
//         element.addEventListener('mouseenter',(e)=>{
//             console.log("hello")
//             console.log(e.target);
//             console.log(e.movieParams)})
//     });
// }

loginButtonFunc();
const users=await fetchUsers();
console.log(users)
const currUser=localStorage.getItem("activeUser");
favCount(users,currUser);
registration(users);
signIn(users);
loginLogout(logout);
console.log(localStorage);

