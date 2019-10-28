// Exercise - 2 
// Добавила ещё проверку ключа доступа до книги. 
// Вопрос: Как сделать что бы ключ устанавливался только один раз для одного библиотекаря, а не для каждой книги, как в примере ниже
// Есть предположение что нужна функция, занимающаяся непосредственно установкой ключа для библиотекаря...попробовала, не получилось :(
// также я добавила переменную отвечающую за срок - на сколько юзер берет книгу, а после, высчитала когда книга будет доступна, но у меня есть вопросы (в коде ниже).
// Заранее спасибо за ответы:)

function LibraryBook (accessKey, bookTitle, bookYear, bookAuthor) {
	var title = bookTitle,
		year = bookYear,
		aurhor = bookAuthor,
		key = accessKey,
		readerName = "",
        readerData,
		days;
		
	function checkKey() {
		return prompt("Your key, please!") === key;
	}
		
	function giveTheBook (client, term) {
		if (checkKey()) {
			readerName = client;
			readerData = new Date().toLocaleDateString();
			isNaN( Number(term) ) ? days = null : days = term; // проверяем ввели ли число
		} else {
			console.log("Sorry, but without right access key we have to say you 'Goodbye'!");
		}
	}
	
	this.getBookInfo = function() {
        if(readerData === "") {
            console.log("This book is available. Just take it!") 
        } else {
            if (days !== null) {
				// Вопрос: Почему в коде ниже я не могу сделать вот так ${readerData.setDate(readerData.getDate() + days).toLocaleDateString()} ?
				// Я имею в виду почему нужно их разбивать?
				// И ещё вопросик, почему у меня не получилось вот так вот, например:
				//  var today = new Date();
				//	var newDate = today.setDate(today.getDate() + days);
				// 	newDate.toLocaleDateString();
				
                readerData.setDate(readerData.getDate() + days); 
                console.log(`Sorry, your book is occupied by another reader by ${readerData.toLocaleDateString()}`); 
             } else {
				 // если в виде срока на которую брали книгу, ввели что-то не приводящиеся к числу, то мы просто выведем дату
                console.log(`Sorry, your book was taken by another reader ${readerData} `) 
             }
        }
	}
	this.getTheBook = function ( client, term ) {
		if(readerName === "") { 
            giveTheBook(client, term);
			return console.log(`please take your book "${ bookTitle }"`);
		} else {
			return null;
		} 
	}
	this.returnBook = function() {
		readerName = "",
		readerData = "";
	}
}

var newBook = new LibraryBook ("123","Book Title", "Book Year", "Book Author");
	
