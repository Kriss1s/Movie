import{regBtn,regName,lastname, login,loginReg,logInBtns,lgSwitchBtn,logInBlock,
    loginDiv,password,signBtn,regDiv,loginpassword,userDiv,regSwitchBtn} from './basics/variables.js';
import {fetchUsers} from './api.js';
let userpic;
export class Register{
    constructor(name,lastname,login,password,fav,watchList){
        this.name=name;
        this.lastname=lastname;
        this.login=login;
        this.password=password;
        this.fav=fav;
        this.watchList=watchList;
    }
}

export function loginButtonFunc(){
    userDiv.addEventListener("mouseenter",()=>{
        userDiv.classList.add('user-enter');
        logInBlock.classList.remove('hidden');
        
    })
    
    userDiv.addEventListener("mouseleave",()=>{
        userDiv.classList.remove('user-enter');
        logInBlock.classList.add('hidden');
    })
    
    lgSwitchBtn.addEventListener('click',()=>{
        regDiv.classList.add("hidden");
        loginDiv.classList.remove("hidden");
    })
    regSwitchBtn.addEventListener('click',()=>{
        regDiv.classList.remove("hidden");
        loginDiv.classList.add("hidden");
    })
    
}
export let checker;

export function loginLogout(func){
    if(localStorage.getItem("activeUser")!==null){
        logInBtns.classList.add("hiddebtn");
        regDiv.classList.add("hidden");
        loginDiv.classList.add("hidden");
        const name=JSON.parse(localStorage.getItem("activeUser"));
                let html="";
                html=`<div class="user-info">
                <h2 class="user-greeting">Hey,${name.name}!</h2>
                <button class="user-param-list user-btn btn"><span class="material-icons">
                    account_box
                    </span>My info</button>
                <button class="btn" id="logout-btn"><span class="material-icons">
                    logout
                    </span>LogOut</button>
                
                </div>`;
                logInBlock.insertAdjacentHTML('beforeend',html)
                document.querySelector(".user-btn").addEventListener("click",()=>window.location.replace("user.html"))
                func();
    }
}

export async function registration(data){
    checkUserInput(loginReg,data,"input");
    // console.log(checkUserInput(loginReg,data, "input"))
    
    //
    regBtn.addEventListener("click",async(e)=>{
        e.preventDefault;
        
        const requirement=regName.value!==""&&lastname.value!==""&&loginReg.value!==""&&password.value!=="";
        if(requirement){
            // console.log("checker now is"+checker)
            if(checker===false){
                console.log("checker now is"+checker)
                
                let acc= new Register(regName.value,lastname.value,loginReg.value,password.value,[],[]);
            addNewUser("POST","http://localhost:3000/users",acc);
            }else{
                loginReg.style.border="1px solid red"
            }
        }else{
            console.log("error")
        }
    })
    
}

// function handleFiles() {
//   const fileList = this.files; /* now you can work with the file list */
// }
let index;
export function signIn(data){
    index=checkUser(data,login);
    signBtn.addEventListener("click",(e)=>{
        if((login.value!=="")&&(loginpassword.value!=="")){
            if(login.value===data[index].login&&data[index].password===loginpassword.value){
                console.log(loginpassword.value);
                console.log(data[index].password)
                console.log(data[index]);
           
                let acc=data[index];
                console.log(acc);
                window.localStorage.setItem("activeUser", JSON.stringify(acc));
                window.location.reload();
            }else if(login.value!==data[index].login){
                console.log(data[index]);
                console.log("incorrect login")
                document.querySelector("#login").style.border="1px red solid"
                document.querySelector("#login").style.borderColor="red"
                
            }else{
                console.log("error new");
                console.log(data[index]);
                document.querySelector("#loginpassword").style.border="1px red solid"
                document.querySelector("#loginpassword").style.borderColor="red"
            }
        }else{
            console.log("error");
            // document.querySelector("#loginpassword").style.border="1px red solid";
            // document.querySelector("#loginpassword").style.borderColor="red";
            // document.querySelector("#login").style.border="1px red solid";
            // document.querySelector("#login").style.borderColor="red";
                
        }
    })
}

export function logout(){
    const logOut=document.querySelector("#logout-btn");
    logOut.addEventListener("click", ()=>{
        console.log(document.querySelector(".user-info"))
        document.querySelector(".user-info").remove();
        window.localStorage.removeItem('activeUser');
        logInBtns.classList.remove("hiddebtn");
        loginDiv.classList.remove("hidden");
        window.location.reload();
    })
}
export function logoutTypeFunc(){
    const logOut=document.querySelector("#logout-btn");
    logOut.addEventListener("click", ()=>{
        console.log(document.querySelector(".user-info"))
        document.querySelector(".user-info").remove();
        window.localStorage.removeItem('activeUser');
        window.location.replace("index.html");
    })

}
export function checkUser(data,checkValue){
    checkValue.addEventListener("change",()=>{
        if(data.some((elem)=>elem.login===checkValue.value)){
            console.log(data.findIndex(e=>e.login===checkValue.value))
            index=data.findIndex(e=>e.login===checkValue.value);
            console.log(typeof index);
            }
        }) 
}
export function checkUserInput(checkValue,checkId,method){
    checkValue.addEventListener(method,()=>{
        if(checkId.some((elem)=>elem.login===checkValue.value)){
            checker=true;
            console.log(checker);
            }else{
                checker=false;
                console.log(checker);
            }
        })
}

export function addNewUser(method,url,acc){
    fetch(url,{
        method : method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(acc)})
        
}



