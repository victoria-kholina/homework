// Exercise - 1 
// не знаю правильный ли этот вариант, думаю что надо было сделать с requestAnimationFrame
// но сделать это с помощью рекурсии мне понятнее чем с requestAnimationFrame :( как то так получилось))

var elem = document.body.appendChild(document.createElement("div"));

var timer = function (currTime = 0) {
   
    if(currTime < 100000) {
        setTimeout (
            function () {
                var date = new Date;
                elem.innerText = date.toLocaleTimeString() 
                timer(currTime += 1000);
            },
            1000
        )
    } else {
        elem.innerText = "100 секунд прошло";
    }
    
}

timer();

// Exercise - 2




// Exercise - 3



