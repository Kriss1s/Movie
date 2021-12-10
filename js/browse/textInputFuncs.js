import{IMG_PATH,DISCOVER,SEARCH_URL,POPULARITY,COUNTRY,YEAR,GENRE,ACTOR,RATE, Movie}from '../basics/variables.js';
import{randomColor}from '../basics/functions.js'
import {addTag} from '../basics/addTag.js';
import {API_KEY,fetchDiscover,fetchUsers,fetchSearch,fetchUsersById} from '../api.js';
import{saveData} from './addMovieToUser.js'


let data=[];
const movieParams=[];
export function browseSearchFunc(){
    document.querySelector(".search-btn").addEventListener("click",addMovie)
}
export async function addMovie(e){
    e.preventDefault;
    //ამოწმებს წინა ძებნიდან თუ დარჩა რამე 
    checkContent();
    //
    const MovieList=document.querySelector(".movie-list");
    const searchTag=document.querySelector(".movie-search");
    let html='';
    html=`<p class="tag">${searchTag.value}</p>`;
    if(searchTag.value!==""){
        const query=searchTag.value.replace(' ', '+');
        //მონაცემებს აბრუნებს სერვერიდან 
        let newdata=await fetchSearch(SEARCH_URL,query)
        console.log(newdata.results);
        const currenMovies=newdata.results;
        //ამატებს საძებნი ტეგების დივებს 
        if(currenMovies.length>0){
            addTag("div",MovieList,html);
            let tags=document.querySelectorAll(".movie-list div");
            tags.forEach(elem=>elem.classList.add("tag-div"))

            //ამატებს ფილმების დივებს
            for (let i = 0; i < currenMovies.length; i++) {
                const{title, backdrop_path,id,original_language,poster_path, genre_ids, overview, vote_average,original_title,release_date,video,
                    popularity}=currenMovies[i];
                    const pic=`${IMG_PATH}${poster_path}`
                // console.log(pic);
                let html=``;
                if(overview!==""&&vote_average>3&&genre_ids.length!==0){
                    // console.log(genre_ids);
                html=`<div class="movie" id="${id}">
                <div class="movie-img">
                    <img src="${pic}" alt="">
                </div>
                <div class="info-div">
                    <h3>${title}</h3>
                    <div class="additional-info">
                        <span class="rate-span">${vote_average}</span>
                        <div class="browse-movie-btn">
                            
                            <button class="add-to-fav browse-movie-btn-single ">Favorites</span></button>
                            <button class="add-to-watchlist browse-movie-btn-single ">Watchlist</button>
                            
                        </div>
                    </div>
                    <p class="p-max">${overview}</p>
                    
                </div>`
                    document.querySelector(".browse-movie-section").insertAdjacentHTML('beforeend',html)

                    
                        movieParams.push(new Movie(title, backdrop_path,id,original_language,poster_path, genre_ids, original_title, overview, vote_average,release_date,video,
                            popularity))
                        // console.log(movieParams);   
                }
            }
        }else{
            html=`<div class="none-movie">
                
                    <p>No matches! :( </p> 
                </div>`
            document.querySelector(".main-browse-container").insertAdjacentHTML('beforeend',html)
            
        }
        saveId(".movie")
        addFavMovieToUser(".add-to-fav");
        addWatchMovieToUser(".add-to-watchlist")
    }
searchTag.value="";
removeTag();
}



export function addFavMovieToUser(selectedElem){
    document.querySelectorAll(selectedElem).forEach(elem=>{
        elem.onclick=async function(e){
           e.stopImmediatePropagation();
           e.stopPropagation();
           let userLogin=localStorage.getItem("activeUser");
          let newUserLogin=JSON.parse(userLogin)["id"]
           const users=await fetchUsersById(newUserLogin);
           console.log(users)
           
           console.dir(e.target)
           const newMovieId=elem.parentNode.parentNode.parentNode.parentNode.attributes.id.value;
           let elementlist=users.fav;
           if(elementlist.every(elem=>elem!==newMovieId)){
            elementlist.push(newMovieId)
            let url='http://localhost:3000/users'+`/${newUserLogin}`
           let movieData={fav:elementlist}
           
           console.log(newMovieId);
           console.log(elementlist);
           console.log(movieData);
           saveData(url,'PATCH',movieData);
           } 
        }
    })
}
export function addWatchMovieToUser(selectedElem){
    document.querySelectorAll(selectedElem).forEach(elem=>{
        elem.onclick=async function(e){
           e.stopImmediatePropagation();
           e.stopPropagation();
           let userLogin=localStorage.getItem("activeUser");
          let newUserLogin=JSON.parse(userLogin)["id"]
           const users=await fetchUsersById(newUserLogin);
           console.log(users)
           
           console.dir(e.target)
           const newMovieId=elem.parentNode.parentNode.parentNode.parentNode.attributes.id.value;
           let elementlist=users.watchList;
           if(elementlist.every(elem=>elem!==newMovieId)){
            elementlist.push(newMovieId)
            let url='http://localhost:3000/users'+`/${newUserLogin}`
           let movieData={watchList:elementlist}
           
           console.log(newMovieId);
           console.log(elementlist);
           console.log(movieData);
           saveData(url,'PATCH',movieData);
           } 
        }
    })
}
export function saveId(selectedElem){
    document.querySelectorAll(selectedElem).forEach(element => {
        element.addEventListener('click',(e)=>{
            e.stopImmediatePropagation();
            e.stopPropagation();
            console.dir(element);
            const id=element.attributes.id.value;
            window.localStorage.setItem('currentMovieId', `${element.attributes.id.value}`);
            console.log(localStorage);
            window.location.href="moviePage.html";
        })
    });
}
export function removeTag(){
    let removetags=document.querySelectorAll(".tag-div");
    removetags.forEach((elem,i)=>{
        elem.addEventListener("click",(e)=>{
            document.querySelectorAll(".movie").forEach(elem=>{
                if(elem.textContent.toLowerCase().includes(e.target.textContent.toLowerCase())){
                    elem.remove()
                }
            })
            e.target.parentNode.remove();
        })
    })
}

function checkContent(){
    if(document.querySelector(".browse-movie-section").children.length>0) {
        document.querySelectorAll(".movie").forEach(elem=>elem.remove());
    }else if(document.querySelector(".none-movie")!==null){
        document.querySelector(".none-movie").remove()
    }
}
