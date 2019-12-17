let userLogin =  document.getElementById("user-login"),
    userPsw = document.getElementById("user-password");

document.cookie  ?
    document.cookie.split(";")
        .map(item => item.split("="))
            .map(item => item[0] === "login" ? userLogin.value = item[1] :
                item[0].trim() === "psw" ? userPsw.value = item[1] : null ) : null;

let avatar = document.getElementById("avatar"),
    login = document.getElementById("login"),
    password = document.getElementById("password");

let imageBase64;
avatar.onchange = function (event) {
    isValid(avatar);
    let reader = new FileReader();
    reader.readAsDataURL(avatar.files[0])
    reader.onload = function (ev) {
        imageBase64 = ev.target.result;
    }
}
password.oninput = function (event) { isValid(password)}

function isValid(input) {
    var errorElem = input.nextElementSibling;

    function removeError() {
        errorElem.textContent.length != 0 ? errorElem.innerText = "" : null;
    }

    switch (input.id) {
        case "login" :
            return input.value === ""  ? errorElem.innerText = "This field is required." : removeError();
            break;

        case "avatar" :
            return !input.files[0]  ? null :
                input.files[0].size / 1024 > 300 ?  errorElem.innerText = "big size of image. Max 300" :
                    input.files[0].type.split('/')[0] != "image" ?  errorElem.innerText = "not an image" :
                        removeError() ;

            break;

        case "password":
            return input.value === ""  ? errorElem.innerText = "This field is required." :
                input.value.length < 8 ?   errorElem.innerText = "password should be min 8 characters" :
                    !input.value.match(/[a-z]+/) ?  errorElem.innerText = "password shoud contain min 1  latin letter in low  register" :
                        !input.value.match(/[A-Z]+/) ?  errorElem.innerText = "password shoud contain min 1 latin letter in UPPER  register":
                            !input.value.match(/\d+/) ?  errorElem.innerText = "password shoud contain min 1 digit" :
                                removeError() ;
            break;
    }
}

document.getElementById("registration-btn").onclick= function (event) {

    const user = {};
    const formInputs = document.getElementById("registration-form").getElementsByTagName("input");
    let formValid = true;

    for (elem of formInputs) {
        isValid(elem);
        if (elem.nextElementSibling.textContent.length != 0) formValid = false ;
    }

    if (formValid) {

        !avatar.files[0] ? user[avatar.name] = "no avatar" : user[avatar.name] = imageBase64;
        user[login.name] = login.value;
        let pswHash = Sha256.hash (password.value);
        user[password.name] = pswHash;

        document.cookie= `login=${login.value}`;
        document.cookie= `psw=${pswHash}`;

        fetch ( 'http://localhost:3000/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then (
            response => response.json()
                .then (
                    response => console.log ( response )
                )
        )
    }
}

document.getElementById("sign-in-btn").onclick = function () {

}