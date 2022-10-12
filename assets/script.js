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
var resultPage = document.querySelector(".result-page")
var resultNum = "";

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
            alert('unable to connect to the data')
        })
}

function printingresult(data) {
    console.log(data);
    resultPage.classList.remove("hidden")
    var headerEl = document.querySelector(".header"); 
    headerEl.textContent = (data.sname + " and " + data.fname);
    var percentageEl = document.querySelector(".percentage");
    percentageEl.textContent = (data.percentage) + "%";
    resultnum = data.percentage;
    var resultSenEl = document.querySelector(".result-sentence");
    //its not working
    resultSenEl.textContent = (data.result);
    
}

function gettingRecommendation(event) {
    var searching = event.target.getAttribute('data-info');
    if (searching === 'movie') {
        gettingMovie();
    } else if (searching === 'quote') {
        gettingMovie();
    } else if (searching === 'activity') {
        gettingMovie();
    }
}

function gettingMovie() {
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
        'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
    }
    };

    fetch('https://watchmode.p.rapidapi.com/releases?start_date=20220301&end_date=20220312&limit=250', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

// frontPage.classList.add("hidden");
resultPage.classList.add("hidden");
submitBtn.on('submit', gettingInput);
reloadBtn.on('click', function () {
    location.reload();
});
tabBtn.on('click', gettingRecommendation)