// Exercise - 1 
var container = document.getElementsByClassName("time")[0];
var elem = container.appendChild(document.createElement("div"));

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



