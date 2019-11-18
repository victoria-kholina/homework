// Exercise - 1

// Вопрос: почему в этом варианте выдало ошибку. Не перезаписало глобальную переменную imageData. В консоле выдало undefined

// var imageData;
// var request = new XMLHttpRequest;
// request.onreadystatechange = function (event) {
//     this.readyState === 4 ? this.status === 200 ?
//         imageData = JSON.parse(this.responseText) :
//         console.warn ('request error') :
//         null
// }
// request.open('GET', 'data.json');
// request.send ();
// console.log(imageData);

// Рабочий вариант
var request = new XMLHttpRequest;
request.onreadystatechange = function (event) {
    if ( this.readyState === 4 ) {
        if (this.status === 200) {
           var imageData = JSON.parse(this.responseText);
           var container = document.getElementById("images")
            imageData.forEach (
                image => {
                    container.appendChild(document.createElement('h2')).innerText = image.title;
                    container.appendChild(document.createElement('img')).src = image.ref;
                }
            )
        } else {
            console.warn ('request error')
        }
    } else {
        null
    }
}
request.open('GET', 'data.json');
request.send ();


// Exercise - 2




// Exercise - 3



