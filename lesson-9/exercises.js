// Exercise - 1 

function typeMessage ( message, velocity ) {
    var container = document.getElementById ( "demo" ) ?
        document.getElementById ( "demo" ) :
        document.body.appendChild (
            document.createElement ( "h3" )
        )
    container.style = `color: magenta;`;
    var arr = message.split("");
    arr.forEach( (letter, index) => setTimeout(
					() => container.innerHTML += letter,
					velocity*1000*index
					)
				)
}
typeMessage ( `Welcome to the hell`, 1 )

// Exercise - 2
var users = (
    function ( list ) {
        var users = []
        for ( var user of list ) 
            users.push ({
                name: user,
                present: false
            }); 

        var presentMarks = ["+","присутствовал", true];
        var absentMarks = ["-","отсутствовал", false ];

        function usersFound (marksArr) {
			users.forEach(user => marksArr.filter( mark => user.present === mark ?
			                                              console.log(user.name) : null ))
         }
        
        return {
            setUserPresent ( userName, present ) {
                users.filter(user => user.name === userName ?  user.present = present : null );
            },
            showPresent () {
                usersFound(presentMarks)
            },
            showAbsent () {
                usersFound(absentMarks)
            }
    
        }
    }
)( [ "Иван" , "Дмитрий", "Степан", "Михаил" ] )

users.setUserPresent( "Иван", "+" )
users.setUserPresent( "Михаил", "присутствовал" )
users.setUserPresent( "Степан", true )

users.showAbsent();

// Exercise - 3



