import * as functions from '../basics/functions.js';
import{IMG_PATH,DISCOVER}from '../basics/variables.js';
import {API_KEY,fetchDiscover} from '../api.js';
import { saveId } from '../browse/textInputFuncs.js';
const header = document.querySelector(".header-block");
let data=[];
export async function getHeaderMovie(obj) {
    const randomPage = functions.randomNum(3) + 1;

    //აბრუნებს მონაცემებს სერვერიდან
    data=await fetchDiscover(`${DISCOVER}upcoming`,randomPage);
    //  console.log(data);
    const randomMovie = functions.randomNum(20);
    // console.log(randomMovie)
    const currentMovie = data.results[randomMovie]
    let {id,vote_average,genre_ids}=currentMovie;
    // let genress=currentMovie[genre_ids]
    // console.log(data.results[randomMovie]);
    const moviePic = `${IMG_PATH}${currentMovie.backdrop_path}`
   
    //ვამოწმებ სურათი თუ არის, თუ არ არის რეკურსიით სხვა ფილმი მოაქვს
    if (currentMovie.backdrop_path !== null) {
        const movieName = currentMovie.title;
        let genress=[];
        for(let ids of genre_ids){
        genress.push(obj[`${ids}`])
        }
        console.log(genress)
        // const genress=genre_ids.forEach(element => {fun(element)});
        header.style.backgroundImage = 'url(' + moviePic + ')';
        const moviehtml = `<div id="${id}" class="info-block">
                        <h1 class="header-movie-name">${movieName}</h1>
                        <div class="flex-cont">
                            <div class="rate">${vote_average}</div>
                            <div class="genre"></div>
                        </div>
                        </div>`
        let p="";
        header.insertAdjacentHTML("beforeend", moviehtml)
        genress.forEach(e=>{
            p=`<p>${e}</p>`
            document.querySelector(".genre").insertAdjacentHTML('beforeend',p)
        })
    } else {
        getHeaderMovie();
    }
}