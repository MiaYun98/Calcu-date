// variable setting 
var submitBtn = $("#search-form");
var reloadBtn = $("#btn-front");
var tabBtn = $('.tabBtn');
var yourNameEl = document.querySelector(".form-input-your");
var crushNameEl = document.querySelector(".form-input-crush");
var frontPage = document.querySelector(".front-page");
var resultPage = document.querySelector(".result-page")
var contentEl = document.querySelector("#content")
var contentListEl = document.querySelector("#contentList")
var resultNum = "";
var movieRecommend = "";

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
    resultPage.classList.remove("hidden")
    var headerEl = document.querySelector(".header");
    headerEl.textContent = (data.sname.charAt(0).toUpperCase() + data.sname.slice(1) + "    &    " + data.fname.charAt(0).toUpperCase() + data.fname.slice(1));
    var percentageEl = document.querySelector(".percentage");
    percentageEl.textContent = (data.percentage + "%");
    resultNum = data.percentage;
    var resultSenEl = document.querySelector(".result-sentence");
    resultSenEl.textContent = ("Result: " + data.result);
    contentEl.classList.add("hidden");
}

// clicks for the tab button on the second page
function gettingRecommendation(event) {
    contentEl.classList.remove("hidden");
    var searching = event.target.getAttribute('data-info');
    if (searching === 'movie') {
        movieCode();
        gettingMovie();
    } else if (searching === 'quote') {
        gettingQuote();
    } else if (searching === 'activity') {
        gettingActivity();
    }
}

// getting the movie genre according to the percentage
function movieCode() {
    console.log(typeof resultNum)
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
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
    };

    fetch('https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=' + movieRecommend + '&page=1', options)
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
    contentListEl.textContent = "";
    var h3 = document.createElement('h3');
    contentListEl.appendChild(h3);
    h3.textContent = ("Based on your percentage match, here are some date movie recommendations: ");
    for (var i = 0; i < 9; i++) {
        var li = document.createElement('li');
        var a = document.createElement("a");
        var img = document.createElement("img");
        img.setAttribute("class", "movie-img")
        a.setAttribute("href", "#");
        a.setAttribute("target", "_blank");
        img.setAttribute("src", data.results[i].poster_path);
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
    console.log(data)
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

// frontPage.classList.add("hidden");
resultPage.classList.add("hidden");
submitBtn.on('submit', gettingInput);
reloadBtn.on('click', function () {
    location.reload();
});
// for the tab
tabBtn.on('click', gettingRecommendation)