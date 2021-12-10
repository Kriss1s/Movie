import { registration ,signIn,loginLogout,logout,loginButtonFunc} from './LoginRegister.js';
import{IMG_PATH,DISCOVER,SEARCH_URL,POPULARITY,COUNTRY,YEAR,GENRE,ACTOR,RATE}from './basics/variables.js';
import {API_KEY,fetchDiscover,fetchUsers} from './api.js';
import{getGenreName} from './getMovies/getGenres.js';
import{favCount,randomNum} from "./basics/functions.js";
// const genres={}
// const getGenre=await getGenreId(genres);
const genreIds={}
const getGenreIds=await getGenreName(genreIds)
console.log(genreIds)
const users=await fetchUsers();
// console.log(users)
const currUser=localStorage.getItem("activeUser");
let genresforBtn=[];
let prefGenre=[];
let prefYear;
const prefActor=[];
// const favlist=users(filter(elem=>elem["login"]===name["login"]));
let btnhtml="";
for(let genre in genreIds){
    genresforBtn.push(genreIds[genre]);
}
genresforBtn.forEach(elem=>{
    btnhtml=`<button id="${elem}" class="random-btns">${elem}</button>`
document.querySelector(".genres-div").insertAdjacentHTML('beforeend',btnhtml);
})

document.querySelectorAll('.random-btns').forEach(elem=>{
    elem.addEventListener("click",(e)=>{
        const currentGenr=e.target.attributes.id.value;
        if(prefGenre.every(el=>el!==currentGenr)){
            prefGenre.push(currentGenr);
            e.target.style.borderColor="red"
        }else{
            prefGenre.splice(currentGenr,1)
            e.target.style.borderColor="white"
        }
        
        console.log(prefGenre);
    });
})

let urlPart="";
document.querySelector(".btn-random").addEventListener("click",async e=>{
    e.preventDefault();
    prefYear=document.querySelector('input[name="radio"]:checked').value;
    const currentgenrIds=[];
    if(prefGenre.length!==0){
        
        for(let names of prefGenre){
            const iddd= Object.keys(genreIds).find(key => genreIds[key] == names);
            currentgenrIds.push(iddd)
        }
        if(prefYear==="new"){
            urlPart=`${DISCOVER}with_genres=${currentgenrIds.join(",")}&primary_release_date.gte=2014-01-01&sort_by=revenue.desc`
        }else{
            urlPart=`${DISCOVER}with_genres=${currentgenrIds.join(",")}&primary_release_date.lte=2014-01-01&sort_by=revenue.desc`
        }
    }else{
        if(prefYear==="new"){
            urlPart=`${DISCOVER}primary_release_date.gte=2014-01-01&sort_by=revenue.desc`
        }else{
            urlPart=`${DISCOVER}primary_release_date.lte=2014-01-01&sort_by=revenue.desc`
        }
    }   
    const rundomnum=randomNum(20);
    
        console.log(currentgenrIds)
        const data=await fetchDiscover(urlPart);
        const id=data.results[rundomnum].id
        console.log(id);
        window.localStorage.setItem('currentMovieId', `${id}`);
            console.log(localStorage);
            window.location.href="moviePage.html";
    
})


loginButtonFunc();
registration(users);
signIn(users);
loginLogout(logout)
favCount(users,currUser);