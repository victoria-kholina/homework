
let mainContainer = document.getElementById("user-account"),
    userLogin =  document.getElementById("user-login"),
    userPsw = document.getElementById("user-password"),
    urlDB = 'http://localhost:3000/users';

// check if autofilled we will in the end when check psw from sign in form
let autofilled = true;
document.cookie  ? getAutofill() : null;

function getAutofill() {  // get info form cookies and autofill form inputs in sign in form
    document.cookie.split(";")
        .map(item => item.split("="))
        .map(item => item[0] === "login" ? userLogin.value = item[1] :
            item[0].trim() === "psw" ? userPsw.value = item[1] : autofilled = false)
}

// START REGISTRATION FORM

let avatar = document.getElementById("avatar"),
     login = document.getElementById("login"),
     password = document.getElementById("password");

let imageBase64;
avatar.onchange = function (event) {  // getting image from obj in base64
    checkImg(avatar)
    let reader = new FileReader();
    reader.readAsDataURL(avatar.files[0])
    reader.onload = function (ev) {
        imageBase64 = ev.target.result;
    }
}

// setting Error text
function errorText (input, message) {
    return input.nextElementSibling.innerText = message;
}

// setting GET  reguste to get users from json
var getUsers = fetch ( urlDB).then (response => response.json());

// check if in db is the same login
login.oninput = function (event) {
    getUsers .then (users => users.find( user => user.login === this.value) ?
        errorText (this,"Sorry, but this login is already occupied by another user. ")  :
        errorText (this,"")
    ) }

password.oninput = function (event) {  checkPsw(password) }

// VALIDATION

function checkImg(img) {
    !img.files[0] ? null :
        img.files[0].size / 1024 > 300 ?  errorText (img,"Big size of image. Please upload max 300kB") :
            img.files[0].type.split('/')[0] != "image" ?  errorText (img,"Not an image. Please upload only images") :
                showImgUploaded(img);
}

function showImgUploaded(img) {
    errorText (img,"");
    let userPhoto =document.getElementById('user-photo');
    userPhoto.src = URL.createObjectURL(img.files[0]);
}

function checkPsw(psw) {
    psw.value === ""  ? errorText (psw, "This field is required.") :
        psw.value.length < 8 ?   errorText (psw, "Password should contain as minimum 8 characters") :
            !psw.value.match(/[a-z]+/) ?  errorText (psw,"Password should contain as minimum 1 latin letter in low register" ):
                !psw.value.match(/[A-Z]+/) ?  errorText (psw, "Password should contain as minimum 1 latin letter in upper register"):
                    !psw.value.match(/\d+/) ?  errorText (psw, "Password should contain as minimum 1 digit" ):
                        errorText (psw, "");
}

function isValid(form) {
    const formInputs = form.getElementsByTagName("input");

    for (inputElem of formInputs) {
           switch (inputElem.id) {
               case "login" :
                   if(inputElem.value === "")   errorText (inputElem,"This field is required.")
                   break;

               case "avatar" :
                        checkImg(inputElem);
                   break;

               case "password":
                        checkPsw(inputElem);
                   break;
           }

        if (inputElem.nextElementSibling.textContent.length != 0)  var formValid = false ;
    }
    return formValid;
}

// end Validation

// REGISTRATION FORM SUBMIT

document.getElementById("registration-btn").onclick= function (event) {
    const user = {};

    if (isValid(document.getElementById("registration-form")) != false ) {

        !avatar.files[0] ? user[avatar.name] = false : user[avatar.name] = imageBase64;
        user[login.name] = login.value;
        let pswHash = Sha256.hash (password.value);
        user[password.name] = pswHash;

        document.cookie= `login=${login.value}`;
        document.cookie= `psw=${pswHash}`;

        fetch ( urlDB, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then (
                response => response.json()
                    .then (
                        response => showAccount(response )
                    )
            )
    }
}

// ANIMATION trigger
function triggerDisplay(elemHide, elemShow) {
    mainContainer.classList.remove("animation-show");
    mainContainer.classList.add("animation-hide");
   setTimeout(()=>{
       mainContainer.classList.add("animation-show");
       document.getElementById(elemHide).style.display ="none";
       document.getElementById(elemShow).style.display ="grid";
    },700)

}
function showAccount(user) {
    triggerDisplay("login-container","welcome-container" );
    history.replaceState(null, null, ' ');
    if(user.avatar ) {
        document.getElementById("user-avatar").src = user.avatar
    }
    document.getElementById("welcome-user").innerHTML = `Hello ${user.login}`
}

function getPsw() {
    return  autofilled ? userPsw.value : Sha256.hash (userPsw.value);
}

// SIGN IN
document.getElementById("sign-in-btn").onclick = function (event) {
    getUsers.then ( users => {
        console.log(users);
        var user = users.find( user => user.login === userLogin.value);
        user ? user.password === getPsw() ? showAccount(user) :
            errorText (userPsw, "Password is wrong. Try again") :
            errorText (userLogin, "Sorry, we can not find user with such login")
    } )
}

// SIGN OUT
document.getElementById("sign-out").onclick = function (event) {
    triggerDisplay("welcome-container", "login-container" )
    getAutofill();
}
