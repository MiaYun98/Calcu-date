console.log("hello")

// quote
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
// 		'X-RapidAPI-Host': 'love-quote.p.rapidapi.com'
// 	}
// };

// fetch('https://love-quote.p.rapidapi.com/lovequote', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));



// variable setting 
var submitBtn = $("#search-form"); 
var reloadBtn = $("#btn-front");
var tabBtn = $('.tabBtn');
var yourNameEl = document.querySelector(".form-input-your");
var crushNameEl = document.querySelector(".form-input-crush");
var frontPage = document.querySelector(".front-page");
var resultPage = document.querySelector(".result-page");
var contentEl = document.querySelector(".content");
var resultNum = "";
var recommendGenre = "";

// getting the input value of the text area
function gettingInput(event) {
    event.preventDefault();
    var yourName = yourNameEl.value.trim();
    var crushName = crushNameEl.value.trim();
    if (!yourName || !crushName) {
        alert("you should write something!")
        return;
    }

    // hidding the first page
    frontPage.classList.add("hidden");
    getCalculate(yourName, crushName);
}

// getting an answer for the percentage and the sentence
function getCalculate(yourName, crushName) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
        }
    };

    fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + yourName + "&fname=" + crushName , options)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    printingresult(data);
                });
            }   
        })
        .catch(function (error) {
            alert('unable to connect to the data');
        })
}

function printingresult(data) {
    console.log(data);
    resultPage.classList.remove("hidden")
    var headerEl = document.querySelector(".header"); 
    headerEl.textContent = (data.sname + " " + data.fname);
    var percentageEl = document.querySelector(".percentage");
    percentageEl.textContent = ("Percentage match:  " + data.percentage);
    resultNum = data.percentage;
    var resultSenEl = document.querySelector(".result-sentnece");
    resultSenEl.textContent = ("Result: " + data.result);
}

function gettingRecommendation(event) {
    var searching = event.target.getAttribute('data-info');
    if (searching === 'movie') {
        console.log('print')
        gettingMovie();
    } else if (searching === 'quote') {
        gettingquote();
    } else if (searching === 'activity') {
        gettingActivity();
    }
}

function gettingMovie() {
    if (resultNum === 0) {
        recommendGenre = 27;
    } else if (resultNum <= 25 && resultNum > 0) {
        recommendGenre = 53;
    } else if (resultNum <= 50 && resultNum > 25) {
        recommendGenre = 10751;
    } else if (resultNum <= 75 && resultNum > 50) {
        recommendGenre = 35;
    } else if (resultNum < 100 && resultNum >75) {
        recommendGenre = 10749;
    } else if (resultNum === 100) {
        recommendGenre = 28;
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=' + recommendGenre + '&page=1&output_language=en&language=en', options)
    .then(function (response) {
        if (response.ok) {
            response.json()
            .then(function (data) {
                contentMovie(data);
            });
        }   
    })
    .catch(function (error) {
        alert('unable to connect to the data')
    })
}

function contentMovie(data) {
    console.log(data)
}

//frontPage.classList.add("hidden");
resultPage.classList.add("hidden");
submitBtn.on('submit', gettingInput);
reloadBtn.on('click', function () {
    location.reload();
});
tabBtn.on('click', gettingRecommendation)