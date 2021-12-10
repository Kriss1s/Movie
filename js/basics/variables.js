export const IMG_PATH = "https://image.tmdb.org/t/p/original"
export const DISCOVER="/discover/movie?";
export const SEARCH_URL = `/search/movie?`;
export const POPULARITY = "&sort_by=popularity.desc";
export const COUNTRY = "&certification_country=";
export const YEAR = "&primary_release_year=";
export const GENRE = "&with_genres=";
export const ACTOR = "&with_people=";
export const RATE="&top_rated";


export const logInBlock=document.querySelector(".logIn-block");
export const userDiv=document.querySelector(".user-div");
export const iconDiv=document.querySelector(".icon-div");
//login registration divs
export const regDiv=document.querySelector(".reg-div");
export const loginDiv=document.querySelector(".login-div");



//btn
export const lgSwitchBtn=document.querySelector(".lg-btn");
export const regSwitchBtn=document.querySelector(".reg-btn");
export const logInBtns=document.querySelector(".logIn-btns");
//register submit button
export const regBtn=document.querySelector("#reg-btn");
export const signBtn=document.querySelector("#sign-btn");
//input
export const regName=document.querySelector("#name");
export const lastname=document.querySelector("#lastname");
export const loginpassword=document.querySelector("#loginpassword");
export const login=document.querySelector("#login");
export const loginReg=document.querySelector("#loginReg");
export const password=document.querySelector("#password");

export class Movie{
    constructor(title,imgUrl,id,originalLang,poster,genre,originalTitle,overview,rate,date,video,popularity){
        this.title=title;
        this.imgUrl=imgUrl;
        this.id=id;
        this.originalLang=originalLang;
        this.poster=poster;
        this.genre=genre;
        this.originalTitle=originalTitle
        this.overview=overview;
        this.rate=rate;
        this.date=date;
        this.video=video;
        this.popularity=popularity;
    }
}