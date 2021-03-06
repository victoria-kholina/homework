// Exercise - 1 
var elem = document.getElementById("time").appendChild(document.createElement("div"));

var timer = function (currTime = 100) {
   
    if(currTime > 0) {
        setTimeout (
            function () {
                var date = new Date;
                elem.innerText = date.toLocaleTimeString() 
                timer(--currTime);
            },
            1000
        )
    } else {
        elem.innerText = "100 секунд прошло";
    }
    
}

timer();

// Exercise - 2

var typeMessage = ( function ( velocity ) {
    let demo;
	let textContainer = document.getElementById("text");
    let container = demo ? demo :
        textContainer.appendChild (
            document.createElement ( "h3" )
        )
    container.style = `color: magenta;`
    container.id = "demo"
    var index = 0
    return function ( message ) {
      demo = document.getElementById("demo");
      function runSimbol() {
          setTimeout(
            () => {
                demo.innerHTML += message[index]
                index++;
                typeMessage(message);
            }, 
            velocity * 1000
          )
      }
      index < message.length ? runSimbol() : null
    }
})( 1 )

typeMessage ( `Welcome to the hell` )



// Exercise - 3

function User ( name ) {
    this.name = name
    this.id = User.counter()
}

User.counter = (
 function () {
        var counter = 0;
        return () => counter++;
    }
)()
   

var users = [
    new User ( "Семен" ),
    new User ( "Антон" ),
    new User ( "Демьян" ),
    new User ( "Василий" )
]

