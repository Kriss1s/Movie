import * as functions from '../basics/functions.js';
import{IMG_PATH,DISCOVER}from '../basics/variables.js';
import {API_KEY,fetchDiscover} from '../api.js';
import {saveId} from "../browse/textInputFuncs.js"
import {addToFav,addToWatch} from "../browse/addMovieToUser.js";
let dataslider=[];
const movieCont=document.querySelectorAll(".movie-container");
const leftBtn=document.querySelectorAll('.left-btn');
const rightBtn=document.querySelectorAll('.right-btn');


//
export async function getMovieList(x1,sliderNum,num){
    // const randomPage = functions.randomNum(pageNum) + 1;
    dataslider=await fetchDiscover(x1,1);
    // console.log(dataslider);
    addToSlider(sliderNum,num);

}

function addToSlider (sliderNum,num){
    let newdata=dataslider.results;
    // console.log(newdata);
    newdata=newdata.filter((img)=>{return img.backdrop_path !== undefined})

    let firstIndex=0;
    let counter=0;

    sliderMove(0,newdata,sliderNum,num)


        rightBtn[sliderNum].addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll(`.movie-item-${sliderNum}`).forEach(elem=>elem.remove());
            counter+=num;
            if(counter>num*num){
                counter=num*num;
            }
                
                if(counter<num*num-1){
                    
                        // console.log("!!!")
                        updateSlider(newdata,sliderNum,num,counter);
                       
               
                console.log(counter)}
            });
    
        
    leftBtn[sliderNum].addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(`.movie-item-${sliderNum}`).forEach(elem=>elem.remove());
        document.querySelectorAll(`.movie-item-${sliderNum}`).forEach(element => {element.animate([{transform:"scale(0)"}],{duration:500})})
        counter-=num;
        if(counter<=0){
            counter=0;
        }
        console.log(counter)

        
            // console.log("!!!")
            updateSlider(newdata,sliderNum,num,counter);
            document.querySelectorAll(`.movie-item-${sliderNum}`).forEach(element => {element.animate([{transform:"scale(1)"}],{duration:500})})

        
        
        
console.log(counter)
    })
}

function updateSlider(data,sliderNum,num,counter){
    for(let i=0; i<num; i++) {
        let movienum=counter+i
        console.log(movienum)
        // const currentMovie = data[movienum];
        // const moviePic = `${IMG_PATH}${currentMovie.backdrop_path}`
        // console.log(typeof moviePic);
        // console.log(moviePic);
        // const movieName = currentMovie.title;
        // const movies=document.querySelectorAll(`.title-${sliderNum}`);
        // const imgs=document.querySelectorAll(`.movie-img-${sliderNum}`);
        // console.log(movies[i]);
        // imgs[i].src=`${moviePic}`
        // movies[i].innerHTML=movieName;

        const currentMovie = data[movienum];
        // console.log(data);
        //     console.log(currentMovie);
        const {id}=data[movienum];
        console.log(id);
            const moviePic = `${IMG_PATH}${currentMovie.backdrop_path}`
            // console.log(moviePic);
            const movieName = currentMovie.title;
            const moviehtml = `<div class="movie-item movie-item-${sliderNum}" id="${id}">
            <img class="movie-img movie-img-${sliderNum}" src="${moviePic}""></img>
            <div class="movie-item-info">
                <h3 class="title title-${sliderNum}">${movieName}</h3>
            <div class="movie-item-btn">
                <button class="add-to-fav"><span class="material-icons">favorite_border</span></button>
                <button class="add-to-watchlist"><span class="material-icons">add</span></button>
            </div>
            </div>
        </div>`
            movieCont[sliderNum].insertAdjacentHTML("beforeend", moviehtml);
        // console.log(moviePic);
            
        if(counter<=num-1){
            leftBtn[sliderNum].disabled =true;
            leftBtn[sliderNum].classList.add("disabled");
            leftBtn[sliderNum].classList.remove("active")
        //     return counter=0
        }else if(counter>=num*num-num){
            rightBtn[sliderNum].disabled =true;
                rightBtn[sliderNum].classList.add("disabled");
                rightBtn[sliderNum].classList.remove("active");
        }else{
            leftBtn[sliderNum].disabled =false;
            rightBtn[sliderNum].disabled =false;
            leftBtn[sliderNum].classList.remove("disabled");
            leftBtn[sliderNum].classList.add("active")
            rightBtn[sliderNum].classList.remove("disabled");
            rightBtn[sliderNum].classList.add("active");
        }
    };
    addToFav(".add-to-fav","fav");  
    addToWatch(".add-to-watchlist","fav")
    saveId(".movie-item");
}
function sliderMove(firstNum,data,sliderNum,num){
    for(let i=firstNum; i<firstNum+num; i++) {
        const currentMovie = data[i];
        // console.log(data);
        //     console.log(currentMovie);
        const {id}=data[i];
        // console.log(id);
            const moviePic = `${IMG_PATH}${currentMovie.backdrop_path}`
            // console.log(moviePic);
            const movieName = currentMovie.title;
            const moviehtml = `<div class="movie-item movie-item-${sliderNum}" id="${id}">
            <img class="movie-img movie-img-${sliderNum}" src="${moviePic}""></img>
            <div class="movie-item-info">
                <h3 class="title title-${sliderNum}">${movieName}</h3>
            <div class="movie-item-btn">
                <button class="add-to-fav"><span class="material-icons">favorite_border</span></button>
                <button class="add-to-watchlist"><span class="material-icons">add</span></button>
            </div>
            </div>
        </div>`
            movieCont[sliderNum].insertAdjacentHTML("beforeend", moviehtml);
            // const newMovieId=elem.parentNode.parentNode.parentNode.parentNode.attributes.id.value;
    };
    addToFav(".add-to-fav","fav");  
    addToWatch(".add-to-watchlist","fav")
    saveId(".movie-item");
}

class Movie{
    constructor(title,imgUrl,id,genre,originalTitle,overview){
        this.title=title;
        this.imgUrl=imgUrl;
        this.id=id;
        this.genre=genre;
        this.originalTitle=originalTitle
        this.overview=overview;
    }
}