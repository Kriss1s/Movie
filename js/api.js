export const API_KEY = "37abf0351a7ba5b2767eede1c3676992";
export const API_URL = "https://api.themoviedb.org/3";

export async function fetchDiscover(searchType,pageNum=1){
    return fetch(`https://api.themoviedb.org/3${searchType}&api_key=37abf0351a7ba5b2767eede1c3676992&page=${pageNum}`).then(res=>{
    console.log(`https://api.themoviedb.org/3${searchType}&api_key=37abf0351a7ba5b2767eede1c3676992&page=${pageNum}`)
    return res.json()})
    
}
export async function fetchMovie(movie_id){
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`).then(res=>{
    console.log(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`)
    return res.json()})
    
}
export async function fetchCast(movie_id){
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`).then(res=>{
        console.log(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`)
    return res.json()})
    
}
export async function fetchReccom(movie_id){
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`).then(res=>{
        console.log(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`)
    return res.json()})
    
}
export async function fetchSearch(searchType,query){
    return fetch(`https://api.themoviedb.org/3${searchType}&api_key=37abf0351a7ba5b2767eede1c3676992&query=${query}&include_adult=false`).then(response=>{
    console.log(`https://api.themoviedb.org/3${searchType}&api_key=37abf0351a7ba5b2767eede1c3676992&query=${query}`)
    return response.json()})
    
}
export async function fetchSearchGenre(){
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=37abf0351a7ba5b2767eede1c3676992&language=en-US`).then(response=>{
    return response.json()})
    
}
export async function fetchUsers() {
    return fetch('https://my-json-server.typicode.com/Kriss1s/Movie/db/users').then(res => {
        return res.json()
    })
}
export async function fetchUsersById(id) {
    return fetch(`https://my-json-server.typicode.com/Kriss1s/Movie/db/users/${id}`).then(res => {
        return res.json()
    })
}
