// Exercise - 1

document.cookie = "last-visit=01/10/2018"

let str = "last-visit";
let cookieKey = document.cookie.split(";")
            .map( data => data.split("=") )
               .find( item => item[0].trim() === str );

if (cookieKey) 
   document.getElementById("date").innerHTML = cookieKey[1]         
   document.cookie =  `${ cookieKey[0] }=${new Date().toLocaleDateString()}`;         


// Exercise - 2

let url = document.getElementById("url")
url.innerHTML = location.href;
window.onhashchange = function(event) {
   localStorage.setItem ( "pageID", location.hash.slice(1))  
   localStorage.setItem ( "startTime", new Date().getTime())  
   url.innerHTML = location.href;       
}

// Exercise - 3
// Шото мне кажется я тут натворила делов)) Но работает!
// Я вот не понимаю как это всё можно оптимизировать((

let btnContainer = document.getElementById("game")
let btn = createElem("button")
btn.innerText = "Let`s play!"

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

const promiseTimeOut = time => new Promise (
    resolve => setTimeout(()=>resolve(), time)
)

function createElem(elem){
    return btnContainer.appendChild(document.createElement(elem))
}

btn.onclick = function (event) {
    btn.style.display = "none"
    let image = createElem("img"),
         userlogin = createElem("h3"),
         winner = getRandomInt(1,20000);

    image.src = "LivelyObviousAnhinga-size_restricted.gif"

    promiseTimeOut(4000)
            .then( () =>  {
                    image.style.opacity = 0;
                    promiseTimeOut(1000) //без этого лишнего промис с таймером не работает transition
                        .then(() => {
                            image.src ="https://thumbs.gfycat.com/OddWideHookersealion-small.gif"
                            image.style.opacity = 1;
                        } )
                        .then ( () =>  promiseTimeOut(2000)
                            .then(() => {

                                // а если обработка запроса будет сильно большая, то как можно вынести fetch из этого ада?
                                fetch(`https://api.github.com/user/${winner}`)
                                    .then( response => response.json()
                                        .then( response => {
                                            image.src = response.avatar_url;
                                            userlogin.innerText = response.login;
                                            // текст отображается раньше чем картинка, то же самое в live demo, как этого избежать, и почему так?
                                        } )
                                    )
                                    .then(() =>   promiseTimeOut(10000)
                                        .then( () => {
                                            image.parentNode.removeChild(image)
                                            userlogin.parentNode.removeChild(userlogin)
                                            btn.style.display = "block"
                                        } )
                                    )
                            } )
                    )
            } )
}



