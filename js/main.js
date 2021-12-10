import * as functions from './basics/functions.js';
import{IMG_PATH,DISCOVER,SEARCH_URL,POPULARITY,COUNTRY,YEAR,GENRE,ACTOR,RATE}from './basics/variables.js';
import {API_KEY,fetchDiscover,fetchUsers} from './api.js';
import{regBtn,regName,lastname, login,password,regDiv,logInBlock,userDiv,loginDiv,lgSwitchBtn,regSwitchBtn,iconDiv,logInBtns} from './basics/variables.js';
import{getHeaderMovie} from './getMovies/getHeader.js';
import{getMovieList} from './getMovies/getSliderMovies.js';
import{getGenreName,getGenreId} from './getMovies/getGenres.js';
import { Register,addNewUser,registration ,checker,checkUserInput,signIn,loginLogout,logout,loginButtonFunc} from './LoginRegister.js';
// import{addFavMovieToUser,addWatchMovieToUser} from './browse/textInputFuncs.js';
// const movieItem=[];
const genres={}
const getGenre=await getGenreId(genres)
const fantasy=genres["Science Fiction"];
const romance=genres["Romance"];
const history=genres["History"];
const genreIds={}
const getGenreIds=await getGenreName(genreIds)
console.log(genreIds);
const sliders=document.querySelectorAll('.movie-container')
const MovieItemNumberForSlider=4;
const pageNumForSliders=3;
const sliderPage=1; //api pages, 1 page=20  movie from 0 index to 19
const slidersContArr=[`${DISCOVER}${RATE}`,`${DISCOVER}sort_by=revenue.desc`,`${DISCOVER}&with_genres=${romance}&sort_by=revenue.desc`,`${DISCOVER}&with_genres=${history}&sort_by=revenue.desc`,`${DISCOVER}&with_genres=${fantasy}sort_by=revenue.desc`];
// const leftBtn=document.querySelectorAll('.left-btn');
// const rightBtn=document.querySelectorAll('.right-btn');
// console.log(action, fantasy)
getHeaderMovie(genreIds);
for(let i=0; i<sliders.length; i++){
    getMovieList(slidersContArr[i],i,MovieItemNumberForSlider);
}

const users=await fetchUsers();
console.log(users)
const currUser=localStorage.getItem("activeUser");
// console.log(localStorage)

loginButtonFunc();

registration(users);
signIn(users);
loginLogout(logout)
// console.log(localStorage);
functions.favCount(users,currUser);
// if(currUser!==null){
//     const user=users.filter(elem=>elem.id===JSON.parse(currUser).id);
//     console.log(user);
//     const favlist=user[0]["fav"];
    
//     console.log(favlist);
//     document.querySelector(".numFav").textContent=`${favlist.length}`;
// }

