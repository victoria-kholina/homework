// Exercise - 2 

var books = [];

function LibraryBook (accessKey, bookTitle, bookYear, bookAuthor) {
	var title = bookTitle,
		year = bookYear,
		author = bookAuthor,
		book =  {
			title : title,
			year : year,
			author : author
		},
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
			term instanceof Date ? days = null : days = term; //проверяем приводятся ли введенные данные к обьекту класса Date
		} else {
			console.log("Sorry, but without right access key we have to say you 'Goodbye'!");
		}
	}
	
	function getRelativeDate ( date, days ) {
			date.setFullYear (
				date.getFullYear(),
				date.getMonth(),
				date.getDate() + days
			)
			return date.toLocaleDateString();
	}
	
	this.getBookInfo = function() {
        !readerData ? console.log("This book is available. Just take it!") :
				days ? console.log(`Sorry, your book is occupied by another reader by ${ getRelativeDate ( new Date(), days ) }`) :
						console.log(`Sorry, your book was taken by another reader ${readerData} `) 
	}
	this.getTheBook = function ( client, term ) {
		if(!readerName) { 
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
	
	books.push(book);
}

var newBook = new LibraryBook ("123","Book Title", "Book Year", "Book Author");

// Exercise - 3

function SomeConstructor() {}

SomeConstructor.prototype.addProperty = function (name, value) {
        this.name = name,
        this.value = value;
    };

var newObj = new SomeConstructor;
newObj.addProperty("someName", "someValue");
	
