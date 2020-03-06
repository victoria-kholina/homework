history.replaceState(null, null, ' ');


function getElem(elemId) {
    return  document.getElementById(elemId);
}

let  mainContainer = getElem("login-page");

function getCookie(key) {  // get info form cookies and autofill form inputs in sign in form
    let cookieValue;
    document.cookie.split("; ")
        .map(item => item.split("="))
            .map(item =>  item[0] === key ? cookieValue = item[1] : null )
    return cookieValue;
}

let loginInCookie = getCookie("login"),
      pswValid = true;

if ( loginInCookie) {
    fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }`)
        .then (response => response.json())
        .then(response => {
            if(response.error !== 404 ) {
                if( getCookie("signed-out") ) {
                    getElem("user-login").value = loginInCookie;
                    mainContainer.classList.add("login","animation-show");
                } else {
                    getElem("login-container").style.display = "none";
                    fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }`)
                        .then (response => response.json())
                        .then(user => user.password === getCookie("psw") ? showAccount(user) : pswValid = false )
                        .then( () => pswValid ? getElem("user-account").style.display = "grid" : null )

                }
                getElem("preloader").style.display = "none";
            } else {
                mainContainer.classList.add("login","animation-show");
                removeCookie();}
                getElem("preloader").style.display = "none";
        })
} else {
    mainContainer.classList.add("login","animation-show");
    getElem("preloader").style.display = "none";

}

for(  var eye of document.getElementsByClassName("eye") ) {
    eye.onclick= function (event) {
        let inputPsw =event.target.nextElementSibling;
        inputPsw.type === "password" ?  inputPsw.type = "text" :  inputPsw.type = "password" ;
    }
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
               case "login" : if (inputElem.value === "")   errorText (inputElem,"This field is required.")
                   break;
               case "avatar" : checkImg(inputElem);
                   break;
               case "password": checkPsw(inputElem);
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
          password = getElem("password"),
          tasks = [];

    if ( isValid( getElem("registration-form") ) != false ) {
        !avatar.files[0] ? user[avatar.name] = false : user[avatar.name] = imageBase64;
        user[login.name] = login.value;
        let pswHash = Sha256.hash (password.value);
        user[password.name] = pswHash;
        user.tasks = tasks;

        fetch ( `https://garevna-rest-api.glitch.me/user/${login.value}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        } ).then (
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
   setTimeout(() => {
       mainContainer.classList.add("animation-show");
       getElem(elemHide).style.display ="none";
       getElem(elemShow).style.display ="grid";
       if(elemShow == "login-container" ) {
           mainContainer.classList.add("login")
       } else  {
           mainContainer.classList.remove("login")
       }
   },700)
}

let emptyDate = new Date ( 0 ).toUTCString ();

// SHOW ACCOUNT

function showAccount(user) {
    if (getElem("login-container").style.display != "none") triggerDisplay("login-container","user-account" );
    history.replaceState(null, null, ' ');
    if (user.avatar ) getElem("user-avatar").src = user.avatar;
    getElem("user-name").innerHTML = `Hello ${user.login}`
    getElem("date").innerText = new Date().toLocaleString('en-US', { dateStyle: 'full' });
    observer.observe ( getElem("tasks"), config );

    fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }` )
        .then ( response => response.json() )
        .then ( user =>  {
            console.log(user);
            // user.tasks.forEach( task=> {
            //     addTask( task.task, task.status).setAttribute("id",task.id)
            //     } )
            hideTasks("done");
            countTasks();
        })
    document.cookie= `login=${user.login}`;
    document.cookie= `psw=${user.password}`;
    document.cookie = "signed-out=; expires=" + emptyDate; // reset time, clearing cookie
    getElem("preloader").style.display = "none";
}

var observer = new MutationObserver (
    function ( mutations ) {
        mutations.forEach(
            function ( mutation ) {

                // DELETE TASK
                for( var elem of document.getElementsByClassName("task-close")) {
                    elem.onclick = function (event) {
                        fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }` )
                            .then ( response => response.json() )
                            .then ( user =>  {
                                let taskIndex = user.tasks.findIndex( task => task.id === event.target.parentElement.getAttribute("id"))
                                user.tasks.splice(taskIndex, 1);
                                requestToEditTasks(user.tasks)
                            } )
                        event.target.parentNode.remove();
                    }
                }
                // CHANGE STATUS OF TASK
                for(  var checkmark of document.getElementsByClassName("checkmark") ) {
                    checkmark.onclick = function (event) {
                        let taskStatus = toggleTaskState(event.target);
                        let taskEdited = event.target.parentElement.parentElement;
                        fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }` )
                            .then ( response => response.json() )
                            .then ( user =>  {
                                let currTask = user.tasks.find( task=> task.id === taskEdited.getAttribute("id"))
                                currTask.status = taskStatus;
                                requestToEditTasks(user.tasks);
                                hideTasks(taskStatus);
                            } )
                    }
                }
            }
        )
    }
)
var config = {
    childList: true
}

function requestToEditTasks(userTasks, onResponse) {
    fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            tasks: userTasks
        } )
    } ) .then ( response => {
        onResponse;
    } )
}

function toggleTaskState(checkMark) {
    let state;
    let parentBox = checkMark.parentElement.parentElement;
    if( parentBox .classList.contains("new") ) {
        parentBox.classList.remove("new");
        parentBox.classList.add("done");
        state =  "done";
    } else if (parentBox.classList.contains("done")) {
        parentBox.classList.remove("done");
        parentBox.classList.add("new");
        state =  "new";
    }
    countTasks()
    return state;
}

function countTasks() {
    let tasksLength= document.getElementsByClassName("new").length;
    tasksLength == 0 ? getElem("new-tasks-num").innerText = "no tasks" :
        tasksLength == 1 ? getElem("new-tasks-num").innerText = tasksLength + " task" :
            getElem("new-tasks-num").innerText = tasksLength + " tasks";

}

// ADD TASK

function addTask(taskText, statusClass) {
    let htmlText = `<label class="task__mark">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                            </label>
                            <p class="task__text">${taskText}</p>
                            <img src="images/close.svg" alt="remove task" class="task-close">`;

    let task = getElem("tasks").insertAdjacentElement('afterbegin', document.createElement("li"));
    task.innerHTML = htmlText;
    task.classList.add("task", statusClass);
    return task;
}

getElem("add-task").onclick = function (event) {
    let newTask = addTask (getElem("new-task").value, "new");
    newTask.setAttribute("id", setID() );

    fetch ( `https://garevna-rest-api.glitch.me/user/${ loginInCookie }` )
        .then ( response => response.json() )
        .then ( user =>  {
            let userTasks =  user.tasks;
            console.log(userTasks)
            userTasks.push({
                id: newTask.getAttribute( "id"),
                task: getElem("new-task").value,
                status: "new"
            })
            console.log(userTasks)
           function cleanValue () {
                getElem("new-task").value = "";
                getElem("new-task").placeholder ="What is your task for today? ";
                countTasks();
            }

            console.log(userTasks)
            requestToEditTasks(userTasks, cleanValue())

        })
}

function setID() {
    let taskId = Math.floor(Math.random() * 10000 );

    for(  var task of document.getElementsByClassName("task") ) {
        if ( task.getAttribute("id") ===  taskId.toString() ) {
            setID();
        }  else {
            return taskId.toString();
        }
    }
}


( function () {
    let quotes = document.getElementsByClassName("quote");
    let randomInt = Math.floor(Math.random() * quotes.length ) ;
    quotes[randomInt].style.display ="flex";
})()

// FILTER TASKS
getElem("all-tasks").onclick= function (event) {
    showTasks("task")
}
getElem("to-do-tasks").onclick= function (event) {
    showTasks("new");
    hideTasks("done");
}
getElem("done-tasks").onclick= function (event) {
    showTasks("done");
    hideTasks("new")
}

function showTasks(className) {
    for(  let task of document.getElementsByClassName(className) ) {
        task.style.display = "flex";
    }
}

function hideTasks(className) {
    for(  let task of document.getElementsByClassName(className) ) {
        task.style.display = "none";
    }
}

// REMOVE ALL TASKS

getElem("close-all-tasks").onclick= function (event) {
    getElem("tasks").innerHTML = "";
    requestToEditTasks( [],  countTasks());
}

// SIGN IN
let formFields = getElem("sign-in-form").getElementsByTagName("input");

getElem("sign-in-btn").onclick = function (event) {
    let userLogin = getElem("user-login"),
        userPsw = getElem("user-password");

    for (field of formFields ) {
        field.value == "" ? errorText (field, "This field is required") : null  }

    if (userLogin.value)
        fetch( `https://garevna-rest-api.glitch.me/user/${userLogin.value}`)
            .then (response => response.json())
                .then ( user => {
                    user.login === userLogin.value ? user.password === Sha256.hash (userPsw.value) ? showAccount(user) :
                        errorText (getElem("user-password"), "Password is wrong. Try again") :
                        errorText (userLogin, "Sorry, we can not find user with such login")
                } )
}

// SIGN OUT
getElem("sign-out").onclick = function (event) {
    triggerDisplay("user-account", "login-container" )
    document.cookie= `signed-out=true`;
}

// DELETE ACCOUNT
getElem("delete-account").onclick = function (event) {
    fetch ( `https://garevna-rest-api.glitch.me/user/${ getCookie("login") }`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then ( response => {
        removeCookie();
        for (field of formFields)  { field.value = "" }
        triggerDisplay("user-account", "login-container" )
    } )
}

function removeCookie() {
    document.cookie = "login=; expires=" + emptyDate;
    document.cookie = "psw=; expires=" + emptyDate;
    document.cookie = "signed out=; expires=" + emptyDate;
}