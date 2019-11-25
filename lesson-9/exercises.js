// Exercise - 1 
// Сделала 2 варианта по-тому что не понятно, вроде как этот смотрится ок..
// вариант 1
function typeMessage ( message, velocity ) {
    var container = document.getElementById ( "demo" ) ?
        document.getElementById ( "demo" ) :
        document.body.appendChild (
            document.createElement ( "h3" )
        )
    container.style = `color: magenta;`;
    var arr = message.split("");
    var index = 0;
    (function showLetter() {
        setTimeout(() => {
           container.innerHTML += arr[index];
           index++;
           index < arr.length ? showLetter() : null;
        } , velocity * 1000)
    })()
}
typeMessage ( `Welcome to the hell`, 1 )

// но судя по тому что мы учили в этом уроке итерирующие массивы, то наверно надо было их использовать.
// Но я не придумала больше других способов как:( Только этот..и он смотрится странно:):/
// вариант 2
function typeMessage ( message, velocity ) {
    var container = document.getElementById ( "demo" ) ?
        document.getElementById ( "demo" ) :
        document.body.appendChild (
            document.createElement ( "h3" )
        )
    container.style = `color: magenta;`;
    var arr = message.split("");
    (function showLetter() {
        var newArr = arr.reduce( (accum, letter ) => accum )
        setTimeout(() => {
           container.innerHTML += newArr;
           arr.shift()
           arr != 0 ? showLetter() : null;
        } , velocity * 1000) 
    })()
   
}
typeMessage ( `Welcome to the hell`, 1 )

// Exercise - 2
// немного поиграла с этой задачей и есть вопросы
var users = (
    function ( list ) {
        var users = []
        for ( var user of list ) 
            addUser(user, false ); 

        function addUser (name, present) {  
            users.push ({
                name: name,
                present: present
            })
        }

        var presentMarks = ["+","присутствовал", true];
        var absentMarks = ["-","отсутствовал", false ];

        function usersFound (marksArr) {// find & some мне кажутся похожи, оба по сути возвращают true если что-то находят, и false - если ничего. но в данном примере find не работает..почему?   
		users.forEach(user => marksArr.some(mark => user.present === mark) ? console.log(user.name) : null)
        }
        
        return {
            setUserPresent ( userName, present ) {
                var userFound = users.find(user => user.name === userName); // здесь find сработал - молодец
                userFound ? userFound.present = present : addUser(userName, present);
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

users.showPresent();
//users.showAbsent();



// Exercise - 3



