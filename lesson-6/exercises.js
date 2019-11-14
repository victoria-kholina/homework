// Exercise - 1 

//Option 1
var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var classes = ['.first', '.second', '.third', '.fourth', '.fifth', '.sixth'];//сразу с точкой
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

//Option 2

var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var classes = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']; //без точки
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

var elems = [ 
    {
        tagName:"h1",
        attrs: {
            className: "first heading",
            id: "heading-h1",
            lang: "en",
            hidden: false,
            onclick: function(event) {
                   event.target.innerHTML = `You just clicked on ${this.tagName} !`
            }
        }
        
    }, 
    {
        tagName:"h2",
        attrs: {
            className: "second heading",
            id: "heading-h2",
            lang: "en",
            hidden: false,
            onclick: function(event) {
                 event.target.innerHTML = `You just clicked on ${this.tagName} !`
            }
      }
        
    }, 
    {
        tagName:"h3",
        attrs: {
            className: "third heading",
            id: "heading-h3",
            lang: "en",
            hidden: false,
            onclick: function(event) {
                event.target.innerHTML = `You just clicked on ${this.tagName} !`
            }
        }
    }
];

var style = document.head.appendChild ( document.createElement ( 'style' ) )
style.textContent = `
    .heading {
        padding: 5px;
        background-color: #ccc;
    }
`
for ( var tag of elems ) {
    var elem = document.body.appendChild (
        document.createElement ( tag.tagName )
    )
    elem.innerHTML = `Heading ${ tag.tagName }`;
    for ( var attr in tag.attrs ) {
         elem [ attr ] = tag.attrs[ attr ]
    }
}


// Exercise - 3

var tags = [ "header", "footer", "main", "div", "p", "script" ]

var style = document.head.appendChild ( document.createElement ( 'style' ) )
style.textContent = `
    .redBack {
        background-color: red!important;
    }
`

for(var i = 0; i < tags.length; i++) {
    var elem = document.body.appendChild (
        document.createElement ( tags[i] )
    ).innerHTML = `This is ${ tags[i] } baby`;
    var bodyChildren = document.body.childNodes;
    for (var x = 0; x < bodyChildren.length; x++) {
        if(bodyChildren[x].nodeName != "SCRIPT") {
            document.body.childNodes[x].classList.add("redBack");
        }
    }
   
}
