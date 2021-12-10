import{loginButtonFunc, loginLogout, logout,logoutTypeFunc} from "./LoginRegister.js";
import { IMG_PATH } from "./basics/variables.js";
import{addList,favCount} from "./basics/functions.js"
import { fetchUsers,fetchMovie } from "./api.js";
import { addToFav } from "./browse/addMovieToUser.js";
const name=JSON.parse(localStorage.getItem("activeUser"));
const users=await fetchUsers();
console.log(users);
console.log(name);

// const favlist=users(filter(elem=>elem["login"]===name["login"]));


loginButtonFunc();
loginLogout(logoutTypeFunc);
const currUser=localStorage.getItem("activeUser");
favCount(users,currUser);


let html="";
const localuser=JSON.parse(localStorage.getItem("activeUser"));
const activeuser=users.filter(e=>e.login===localuser.login)
console.log(activeuser[0].name)
let rank=""
if(activeuser[0].fav.length<=5){
    rank="Newbie"
}else if(activeuser[0].fav.length<=10){
    rank="Senior Lieutenant"
}else if(activeuser[0].fav.length<=50){
    rank="Commander"
}else if(activeuser[0].fav.length<=100){
    rank="Captain"
}else if(activeuser[0].fav.length<=350){
    rank="Real Admiral"
}else{
    rank="Grand Admiral"
}
html=`<div class="row"><h3>Full Name:</h3><div class="line">.............</div><p class="user-name">${activeuser[0].name}  ${activeuser[0].lastname}</p></div>
<div class="row"><h3>Username:</h3><div class="line">.............</div><p class="user-name">${activeuser[0].login}</p></div>
<div class="row"><h3>Rank:</h3><div class="line">.............</div><p class="user-name">${rank}</p></div>
<div class="row"><h3>Movie List:</h3><div class="line">.............</div><p class="user-name">${activeuser[0].fav.length}</p></div>
<div class="row"><h3>WatchList:</h3><div class="line">.............</div><p class="user-name">${activeuser[0].watchList.length}</p></div>
<div class=" button-row row"><a href="" class="btn fav">See Favourites</a><a class="btn watch-btn">See WatchList</a></div>
`;

document.querySelector(".user-information-div").insertAdjacentHTML("beforeend",html)
console.log(localStorage);



const favlist=activeuser[0].fav
const watchlist=activeuser[0].watchList
console.log(watchlist);
// return movie fav
const favbtn=document.querySelector(".fav")
const watchbtn=document.querySelector(".watch-btn")
console.dir(favbtn)
let counterfav=0;
let counterWatch=0

favbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    counterfav++
    if(counterfav%2===1){
        document.querySelector(".heading-fav").classList.remove("hidden")
    document.querySelector(".fav-div").classList.remove("hidden")
    addList(favlist,".fav-div")
    
    }else{
        document.querySelector(".heading-fav").classList.add("hidden")
        document.querySelectorAll(".fav-div .movie-item").forEach(elem=>elem.remove());
    }
    
});
watchbtn.addEventListener("click",(e)=>{

    e.preventDefault();
    counterWatch++
    if(counterWatch%2===1){
        document.querySelector(".heading-watch").classList.remove("hidden")
    document.querySelector(".watch-list-div").classList.remove("hidden")
    addList(watchlist,".watch-list-div")
    }else{
        document.querySelector(".heading-watch").classList.add("hidden")
        document.querySelectorAll(".watch-list-div .movie-item").forEach(elem=>elem.remove());
    }
    
});

