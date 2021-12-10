import{fetchUsersById} from '../api.js';
// export async function(newMovieId){
// if()

// }
export function addToFav(selectedElem){
//     // (key,currentid)
//     // "fav",`.movie-item-${sliderNum}`

    document.querySelectorAll(selectedElem).forEach(elem=>{
        
        elem.addEventListener("click", async function(e){
                    let movieData;
                    e.stopImmediatePropagation();
                    e.stopPropagation();
     
                // const newMovieId=document.querySelector(currentid).id;
                let userLogin=localStorage.getItem("activeUser");
               let newUserLogin=JSON.parse(userLogin)["id"]
                const users=await fetchUsersById(newUserLogin);
                console.log(users)
                const newMovieId=elem.parentNode.parentNode.parentNode.attributes.id.value;
                let elementlist=users.fav;
                if(elementlist.every(elem=>elem!==newMovieId)){
                    elementlist.push(newMovieId)
                    let url='http://localhost:3000/users'+`/${newUserLogin}`
                    
                       movieData={fav:elementlist}
                    
                
                   console.log(newMovieId);
                   console.log(elementlist);
                   console.log(movieData);
                   saveData(url,'PATCH',movieData);
                }else{
                    const eraseElem=elementlist.filter(e=>e!==newMovieId)
                    console.log(eraseElem)
                    // elementlist.splice(`${eraseElem[0]}`,1)
                    console.log(eraseElem.length)
                    console.log(eraseElem)
                    let url='http://localhost:3000/users'+`/${newUserLogin}`
                    
                       movieData={fav:eraseElem}
                
                
                   console.log(newMovieId);
                   console.log(elementlist);
                   console.log(movieData);
                   saveData(url,'PATCH',movieData);
                }
        })  
    })
}
export function addToWatch(selectedElem){
    //     // (key,currentid)
    //     // "fav",`.movie-item-${sliderNum}`
    
        document.querySelectorAll(selectedElem).forEach(elem=>{
            
            elem.addEventListener("click", async function(e){
                        let movieData;
                        e.stopImmediatePropagation();
                        e.stopPropagation();
         
                    // const newMovieId=document.querySelector(currentid).id;
                    let userLogin=localStorage.getItem("activeUser");
                   let newUserLogin=JSON.parse(userLogin)["id"]
                    const users=await fetchUsersById(newUserLogin);
                    console.log(users)
                    const newMovieId=elem.parentNode.parentNode.parentNode.attributes.id.value;
                    let elementlist=users.watchList;
                    if(elementlist.every(elem=>elem!==newMovieId)){
                        elementlist.push(newMovieId)
                        let url='http://localhost:3000/users'+`/${newUserLogin}`
                        
                           movieData={watchList:elementlist}
                        
                    
                       console.log(newMovieId);
                       console.log(elementlist);
                       console.log(movieData);
                       saveData(url,'PATCH',movieData);
                    }else{
                        const eraseElem=elementlist.filter(e=>e!==newMovieId)
                    console.log(eraseElem)
                    // elementlist.splice(`${eraseElem[0]}`,1)
                    console.log(eraseElem.length)
                    console.log(eraseElem)
                    let url='http://localhost:3000/users'+`/${newUserLogin}`
                    
                       movieData={watchList:eraseElem}
                
                
                   console.log(newMovieId);
                   console.log(elementlist);
                   console.log(movieData);
                   saveData(url,'PATCH',movieData);
                    }
            })  
        })
    }

export function saveData(url,method, movieData) {
    fetch(url, {
        method : method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
}