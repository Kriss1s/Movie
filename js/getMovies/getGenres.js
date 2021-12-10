import {API_KEY,fetchDiscover,fetchSearchGenre} from '../api.js';
//
export async function getGenreName(obj){
    const genreId=await fetchSearchGenre();
    let genre=genreId.genres;
// console.log(genre);
   genre.forEach(elem=>{
    return obj[elem.id]=elem.name;
})
};
export async function getGenreId(obj){
    const genreId=await fetchSearchGenre();
    let genre=genreId.genres;
// console.log(genre);
   genre.forEach(elem=>{
    return obj[elem.name]=elem.id;
})
};
