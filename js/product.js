import {IMG_PATH} from "./basics/variables.js";
import {addNewUser,registration ,checker,checkUserInput,signIn,logout,loginLogout,loginButtonFunc} from './LoginRegister.js';
import {API_KEY,fetchDiscover,fetchUsers,fetchSearch,fetchMovie,fetchCast, fetchReccom} from './api.js';
import {addToFav,addToWatch} from './browse/addMovieToUser.js';
import{saveId} from './browse/textInputFuncs.js';
import { getGenreName } from "./getMovies/getGenres.js";
import{favCount}from './basics/functions.js';

const id=localStorage.getItem("currentMovieId");
const movieContainer=document.querySelector(".movie-container");
const recomendCont=document.querySelector(".recommend");

console.log(id);
//return movie details
const movie= await fetchMovie(`${id}`)
console.log(movie);
const {backdrop_path,genres,homepage,original_title,overview,poster_path,
    production_countries,release_date,runtime,tagline,title,video,vote_average}=movie;
const moviePic = `${IMG_PATH}${poster_path}`


const users=await fetchUsers();
const currUser=localStorage.getItem("activeUser");
favCount(users,currUser);
console.log(moviePic);
console.log(production_countries[0]);
document.body.style.backgroundImage=`url(${IMG_PATH}${backdrop_path})`
document.querySelector("img").src=`${moviePic}`;
document.querySelector(".movie-title").innerText=`${title}`;
const countries=[];
production_countries.forEach(elem =>countries.push(elem.name))
const GenresObj={};
getGenreName(GenresObj);

// const genreIds=[];
// genres.forEach(elem=>genreIds.push(elem.id))
// let genresName=[]
// genreIds.forEach(elem=>GenresObj[elem]);
// console.log(GenresObj)
// console.log(genreIds)
// console.log(genresName)
let htmlmovie=`<div class="information-div">
<p class="movie-det"> Title: <span>${title}</span></p>
<p class="movie-det"> Original title: <span>${original_title}</span></p>

<p class="movie-det"> Production country: <span>${countries.join(",")}</span></p>
<p class="movie-det"> Release date: <span>${release_date}</span></p>
<p class="movie-det"> Runtime: <span>${Math.floor(runtime/60)}:${runtime%60}</span></p>
<p class="movie-det"> Rate: <span>${vote_average}</span></p>
<p class="movie-det"> Official page: <a href="${homepage}" target="_blank">${homepage}</a></p>
<p class="movie-det"> Overview: <span>${overview}</span></p>
</div>`
//return movie cast
const castArr=await fetchCast(`${id}`);
console.log(castArr)
movieContainer.insertAdjacentHTML("beforeend",htmlmovie)
const cast=castArr.cast;
// console.log(cast)
let htmlCast=""


for(let i=0; i<9; i++){
    htmlCast=`<div class="cast">
            <div class="cast-img">
                    <img src="${IMG_PATH}${cast[i].profile_path}" alt="">
                </div>
                <div class="actor-info">
                <p class="info-p">Chaaracter: ${cast[i].character}</p>
                <p class="info-p">Actor: ${cast[i].name}</p>
                </div>
                </div>
            </div>`
    document.querySelector(".castContainer").insertAdjacentHTML("beforeend", htmlCast)
}

// return movie reccomandation
const recdata=await fetchReccom(`${id}`);
const recommandation=recdata.results
console.log(recommandation);
let htmlRec="";

for(let i=0; i<20; i++){
    const currentMovie = recommandation[i];
        console.log(recommandation);
            console.log(currentMovie);
        const {id}=recommandation[i];
        console.log(id);
            const moviePic = `${IMG_PATH}${currentMovie.backdrop_path}`
            // console.log(moviePic);
            const movieName = currentMovie.title;
            htmlRec = `<div class="movie-item " id="${id}">
            <img class="movie-img" src="${moviePic}""></img>
            <div class="movie-item-info">
                <h3 class="title">${movieName}</h3>
            <div class="movie-item-btn">
                <button class="add-to-fav"><span class="material-icons">favorite_border</span></button>
                <button class="add-to-watchlist"><span class="material-icons">add</span></button>
            </div>
            </div>
        </div>`
    recomendCont.insertAdjacentHTML("beforeend",htmlRec)
}
addToFav(".add-to-fav","fav");  
    addToWatch(".add-to-watchlist","fav")
    saveId(".movie-item");




loginButtonFunc();
// console.log(id);
registration(users);
signIn(users);
loginLogout(logout)
console.log(localStorage);

