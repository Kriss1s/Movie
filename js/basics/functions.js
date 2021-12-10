import { IMG_PATH } from "../basics/variables.js";
import{fetchMovie}from '../api.js';
import{addToFav,addToWatch}from '../browse/addMovieToUser.js';
export function randomNum(max) {
    return Math.floor(Math.random() * max);
}
export function checkHide(div, classs){
    return div.classList.contains(classs);
   
}
export function randomColor(transparence){
const r=randomNum(255)+1;
const g=randomNum(255)+1;
const b=randomNum(255)+1;
return `rgba(${r},${g},${b},${transparence})`
}
export function favCount(data,storageElem){
    if(storageElem!==null){
        const user=data.filter(elem=>elem.id===JSON.parse(storageElem).id);
        // console.log(user);
        const favlist=user[0]["fav"];
        
        // console.log(favlist);
        document.querySelector(".numFav").textContent=`${favlist.length}`;
    }
}

export async function addList(prefferedList,currentclass){
    for(let i=0; i<prefferedList.length; i++){
  
    const currentMovie = await fetchMovie(prefferedList[i]);
    console.log(currentMovie);
        //const currentMovie=0;
            console.log(currentMovie);
        const {id}=currentMovie; 
        console.log(id);
            const moviePic = `${IMG_PATH}${currentMovie.backdrop_path}`
            // console.log(moviePic);
            const movieName = currentMovie.title;
            let htmlmovies = `<div class="movie-item " id="${id}">
            <img class="movie-img" src="${moviePic}""></img>
            <div class="movie-item-info">
                <h3 class="title">${movieName}</h3>
            <div class="movie-item-btn">
                <button class="add-to-fav"><span class="material-icons">
                heart_broken
                </span></button>
                <button class="add-to-watchlist"><span class="material-icons">
                remove
                </span></button>
            </div>
            </div>
        </div>`
    document.querySelector(currentclass).insertAdjacentHTML("beforeend",htmlmovies)
    } 
    // document.querySelector(hideclass).classList.toggle("hidden");
    // saveId(".movie-item");
    addToFav(".add-to-fav")
    addToWatch(".add-to-watchlist")
}