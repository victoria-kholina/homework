// Exersise - 1 

var letters = [];
var str = "Backend As A Service";
str = str.split(" ");

for(i=0; i< str.length; i++) {
letters.push( str[i][0] );
}

str = letters.join("");
console.log(str);
document.getElementsByClassName("result-1")[0].innerHTML = str;

// Exersise - 2

checkType (10);
  
function checkType (arg) {
	var date = new Date().toLocaleString();
	var result  = document.getElementsByClassName("result-2")[0];
	
	if( (typeof(arg) === "number")) {
		result.innerHTML = date;
		console.log(date);
	} else {
		result.innerHTML = "Неверный тип данных";
		console.log("Неверный тип данных");
	}
}
	