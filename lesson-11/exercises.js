// Exercise - 1 

var request = new XMLHttpRequest;
request.onreadystatechange = function (event) {
    this.readyState === 4 ? this.status === 200 ?
        console.log (this.responseText) :
        console.warn ('request error') :
        null
}
request.open('GET', 'data.json')
request.send ()

// Exercise - 2




// Exercise - 3



