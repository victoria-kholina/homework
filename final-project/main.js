history.replaceState(null, null, ' ');
function getElem(elemId) {
    return  document.getElementById(elemId);
}

// check if autofilled we will in the end when check psw from sign in form
let  mainContainer = getElem("user-account"),
      autofilled = true;

function getAutofill() {  // get info form cookies and autofill form inputs in sign in form
    document.cookie.split("; ")
        .map(item => item.split("="))
            .map(item => item[0] === "login" ? getElem("user-login").value = item[1] :
                item[0] === "psw" ? getElem("user-password").value = item[1] : autofilled = false)
}

if (localStorage.getItem("signed-in") ) {
    getElem("login-container").style.display = "none";
    fetch ( `https://garevna-rest-api.glitch.me/user/${localStorage.getItem("signed-in")}`)
                .then (response => response.json()).then(user => showAccount(user))
                    .then(()=> {
                        getElem("welcome-container").style.display = "grid";
                        mainContainer.classList.add("animation-show")
                })
} else {
    mainContainer.classList.add("animation-show");
    document.cookie  ? getAutofill() : null;
}

// Start Registration form Validation

let imageBase64;
getElem("avatar").onchange = function (event) {  // getting image from obj in base64
    checkImg(event.target)
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onload = function (ev) {
        imageBase64 = ev.target.result;
    }
}

// setting Error text
function errorText (input, message) {
    return input.nextElementSibling.innerText = message;
}

// check if in db is the same login
getElem("login").onchange = function (event) {
    event.target.value != "" ?
        fetch ( `https://garevna-rest-api.glitch.me/user/${event.target.value}`)
                .then (response => response.json())
                    .then(response => {
                        !response.error ? errorText (event.target,"Sorry, but this login is already occupied by another user. ") : errorText (event.target,"")
                    }) : errorText (event.target,"This field is required")
}

getElem("password").oninput = function (event) {  checkPsw(event.target) }

function checkImg(img) {
    !img.files[0] ? null :
        img.files[0].size / 1024 > 300 ?  errorText (img,"Big size of image. Please upload max 300kB") :
            img.files[0].type.split('/')[0] != "image" ?  errorText (img,"Not an image. Please upload only images") :
                showImgUploaded(img);
}

function showImgUploaded(img) {
    errorText (img,"");
    let userPhoto = getElem('user-photo');
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

getElem("registration-btn").onclick= function (event) {
    const user = {};
    let avatar = getElem("avatar"),
          login = getElem("login"),
          password = getElem("password");


    if ( isValid( getElem("registration-form") ) != false ) {

        !avatar.files[0] ? user[avatar.name] = false : user[avatar.name] = imageBase64;
        user[login.name] = login.value;
        let pswHash = Sha256.hash (password.value);
        user[password.name] = pswHash;

        document.cookie= `login=${login.value}`;
        document.cookie= `psw=${pswHash}`;

        fetch ( `https://garevna-rest-api.glitch.me/user/${login.value}`, {
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


function triggerDisplay(elemHide, elemShow) {   // Animation trigger
    mainContainer.classList.remove("animation-show");
    mainContainer.classList.add("animation-hide");
   setTimeout(()=>{
       mainContainer.classList.add("animation-show");
       getElem(elemHide).style.display ="none";
       getElem(elemShow).style.display ="grid";
    },700)
}

function showAccount(user) {
    if (getElem("login-container").style.display != "none") triggerDisplay("login-container","welcome-container" );
    history.replaceState(null, null, ' ');
    if(user.avatar ) {
        getElem("user-avatar").src = user.avatar
    }
    getElem("welcome-user").innerHTML = `Hello ${user.login}`
    localStorage.setItem("signed-in", user.login);
}

function getPsw() {
    let userPsw = getElem("user-password");
    return  autofilled ? userPsw.value : Sha256.hash (userPsw.value);
}

let formFields = getElem("sign-in-form").getElementsByTagName("input");

// SIGN IN
getElem("sign-in-btn").onclick = function (event) {
    let userLogin = getElem("user-login");
    for(field of formFields) {
        field.value == "" ? errorText (field, "This field is required") : null
    }
    if (userLogin.value)
        fetch( `https://garevna-rest-api.glitch.me/user/${userLogin.value}`)
            .then (response => response.json())
                .then ( user => {
                    user.login === userLogin.value ? user.password === getPsw() ? showAccount(user) :
                        errorText (getElem("user-password"), "Password is wrong. Try again") :
                        errorText (userLogin, "Sorry, we can not find user with such login")
                } )
}

// SIGN OUT
getElem("sign-out").onclick = function (event) {
    triggerDisplay("welcome-container", "login-container" )
    getAutofill();
    localStorage.removeItem("signed-in")
}

// DELETE ACCOUNT
getElem("delete-account").onclick = function (event) {
    fetch ( `https://garevna-rest-api.glitch.me/user/${localStorage.getItem("signed-in") }`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then ( response => {
        localStorage.removeItem("signed-in");
        let emptyDate = new Date ( 0 ).toUTCString ();
        document.cookie = "login=; expires=" + emptyDate;
        document.cookie = "psw=; expires=" + emptyDate;
        for (field of formFields)  { field.value = "" }
        triggerDisplay("welcome-container", "login-container" )
    } )
}