// Exercise - 1 

// Добавила динамичное добавление классов в стили
// Вопрос: Какой вариант правильнее из 2-x?
//Вариант 1
var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var classes = ['.first', '.second', '.third', '.fourth', '.fifth', '.sixth'];
var style = document.head.appendChild ( document.createElement ( 'style' ) )

style.textContent = `
    ${classes} {
        padding: 5px;
        background-color: #ccc;
    }
`
for (var i = 0; i< tags.length; i++) {
    var elem = document.createElement(tags[i]);
	
    document.body.appendChild(elem).innerHTML = `Heading ${tags[i]}`;
    elem.className += classes[i].slice(1, classes[i].length);
}

//Вариант 2

var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var classes = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
var style = document.head.appendChild ( document.createElement ( 'style' ) )
var classesForStyle = []

for(var i = 0; i < classes.length; i++) {
     classesForStyle.push("." + classes[i]);
 }

style.textContent = `
    ${classesForStyle} {
        padding: 5px;
        background-color: #ccc;
    }
`
for (var i = 0; i< tags.length; i++) {
    var elem = document.createElement(tags[i]);
    document.body.appendChild(elem).innerHTML = `Heading ${tags[i]}`;
    elem.className += classes[i];
}


// Exercise - 2



// Exercise - 3

