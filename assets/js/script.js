// variable setting 
var submitBtn = $("#search-form");
var reloadBtn = $("#btn-front");
var tabBtn = $('.tabBtn');
var yourNameEl = document.querySelector(".form-input-your");
var crushNameEl = document.querySelector(".form-input-crush");
var frontPage = document.querySelector(".front-page");
var resultPage = document.querySelector(".result-page");
var contentEl = document.querySelector("#content");
var contentListEl = document.querySelector("#contentList");
var contentPageEl = document.querySelector(".content-page");
var resultNum = "";
var movieRecommend = "";

//sound 
var myMusic = new Audio();
myMusic.src = "./assets/image/soundeffect.mp3";
myMusic.volume = 0.2;

var heartbeat = new Audio();
heartbeat.src = "./assets/image/heartbeat-01.mp3"

var happyMusic = new Audio();
happyMusic.src = "./assets/image/clap.mp3"
happyMusic.volume = 0.2;

// getting the input value of the text area
function gettingInput(event) {
    event.preventDefault();
    var yourName = yourNameEl.value.trim();
    var crushName = crushNameEl.value.trim();
    if (!yourName || !crushName) {
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

    fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + yourName + "&fname=" + crushName, options)
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

// result of the love - calculator
function printingresult(data) {
    resultPage.classList.remove("hidden");
    var headerEl = document.querySelector(".header");
    headerEl.textContent = (data.sname.charAt(0).toUpperCase() + data.sname.slice(1) + "    &    " + data.fname.charAt(0).toUpperCase() + data.fname.slice(1));
    var percentageEl = document.querySelector(".percentage");
    percentageEl.textContent = (data.percentage + "%");
    resultNum = data.percentage;
    var resultSenEl = document.querySelector(".result-sentence");
    resultSenEl.textContent = ("Result: " + data.result);
    contentPageEl.classList.add('hidden');
    if (resultNum < 50) { 
        myMusic.play();
    } else {
        happyMusic.play();
    }
}

// clicks for the tab button on the second page
function gettingRecommendation(event) {
    var searching = event.target.getAttribute('data-info');
    if (searching === 'movie') {
        movieCode();
        gettingMovie();
    } else if (searching === 'quote') {
        gettingQuote();
    } else if (searching === 'activity') {
        console.log('clcik')
        gettingActivity();
    }
    contentPageEl.classList.remove('hidden');
}

// getting the movie genre according to the percentage
function movieCode () {
    if (resultNum === 0) {
        movieRecommend = '27';
    } else if (resultNum > 0 && resultNum < 25) {
        movieRecommend = '53';
    } else if (resultNum > 25 && resultNum < 50) {
        movieRecommend = '10751';
    } else if (resultNum > 50 && resultNum < 75) {
        movieRecommend = '35';
    } else if (resultNum > 75 && resultNum < 100) {
        movieRecommend = '10749';
    } else if (resultNum === 100) {
        movieRecommend = '28';
    }
}
// having a recommendation according to the percentage of the match
function gettingMovie() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=' + movieRecommend + '&page=1&output_language=en&language=en', options)
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

// pringint the movie list into the box
function contentMovie(data) {
    console.log(data.results)
    contentListEl.textContent = "";
    var h3 = document.createElement('h3');
    contentListEl.appendChild(h3);
    h3.textContent = ("Based on your percentage match, here are some date movie recommendations: ");
    for (var i = 0; i < data.results.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement("a");
        var img = document.createElement("img");
        img.setAttribute("class", "movie-img")
        a.setAttribute("href", data.results[i].streamingInfo.netflix.us.link);
        a.setAttribute("target", "_blank");
        img.setAttribute("src", data.results[i].posterURLs.original);
        a.appendChild(img)
        li.appendChild(a);
        contentListEl.appendChild(li);
    }
}

// rendom quote generating API
function gettingQuote() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'love-quote.p.rapidapi.com'
        }
    };

    fetch('https://love-quote.p.rapidapi.com/lovequote', options)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        printingquote(data);
                    });
            }
        })
        .catch(function (error) {
            alert('unable to connect to the data')
        })
}

// printing quotes to the HTML so they show up to the content box
function printingquote(data) {
    contentListEl.textContent = "";
    var li = document.createElement('li');
    var h4 = document.createElement('h4');
    if (!data.quote) {
        h4.textContent = (data.title);
    } else {
        h4.textContent = (data.quote);
    }

    var h5 = document.createElement('h5');
    h5.textContent = (data.author);
    li.appendChild(h4);
    li.appendChild(h5);
    contentListEl.appendChild(li);
}

function gettingActivity () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com'
        }
    };
    
    fetch('https://random-recipes.p.rapidapi.com/ai-quotes/1', options)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            contentListEl.textContent = "";
            var img = document.createElement('img');
            var li = document.createElement('li');
            var p = document.createElement('p');
            var h3 = document.createElement('h3');
            console.log(data[0].image)
            img.setAttribute("src", data[0].image);
            img.setAttribute("class", "food-image");
            h3.textContent = (data[0].title);
            p.textContent = (data[0].ingredients);
            li.appendChild(img);
            li.appendChild(p);
            contentListEl.appendChild(h3)
            contentListEl.appendChild(li);
        })
        .catch(err => console.error(err));
}

resultPage.classList.add("hidden");
$("#button").on('mousedown', function () {
    heartbeat.play();
});
$("#button").on('mouseup', function() {
    heartbeat.pause();
    heartbeat.currentTime = 0;
});
reloadBtn.on('click', function () {
    location.reload();
});
submitBtn.on('submit', gettingInput);
// for the tab
tabBtn.on('click', gettingRecommendation)