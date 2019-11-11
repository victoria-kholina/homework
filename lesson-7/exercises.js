// Exercise - 1 

var image = document.createElement("img");
image.setAttribute("src", "https://bipbap.ru/wp-content/uploads/2017/04/0d03d0ba99b8720dbdaeba75c5a644f5.jpg");
image.style = `
        width:100px; 
        transition-duration: 2s;`
        
console.log(image)

var paragraph = document.body.appendChild(document.createElement("p"));
paragraph.innerText = "This is love";

paragraph.onclick = function(event) {
event.target.after(image);
}

image.onmouseover = function(event) {
event.target.style.width = "200px";
}

// Exercise - 2

var collection = [ "main", "section", "article", "p" ];

function over ( event ) {
     event.target.style.backgroundColor = "#ffff00";
}  
function out ( event ) {
     event.target.style.backgroundColor = "#ff00ff";
}
function clickHandler ( event ) {
    event.stopPropagation();
    for ( let child of event.target.children )
        event.target.parentNode.appendChild ( 
            event.target.removeChild ( child ) 
        )
    event.target.remove()
}

var parentTag = document.body;
var parentWidth = 500;
var parentHeight = 500;
var widthDecreaseInt = 50;
var heightDecreaseInt = 50;

var style = document.head.appendChild ( document.createElement ( 'style' ) )
style.textContent = `
    .box {
        background-color: #ff00ff;
        position: absolute;
        border: dotted 1px yellow;
        left: ${widthDecreaseInt/2}px;
        top: ${heightDecreaseInt/2}px;
        margin: 0;
    }
`

collection.forEach (   
    function ( tag, index, arr  ) {
           var childTag = document.createElement(tag);
           parentTag = parentTag.appendChild(childTag);
           parentTag.classList.add('box');

           index === 0 ? parentTag.style = `
                            width: ${parentWidth}px;
                            height: ${parentHeight}px;
                            ` :
                            parentTag.style = `
                                width: ${parentWidth -= widthDecreaseInt}px;
                                height: ${parentHeight -= heightDecreaseInt}px;
							`;
            parentTag.onmouseover = over;
            parentTag.onmouseout = out;
            parentTag.onclick = clickHandler;
    }
)


// Exercise - 3

//to be continued

