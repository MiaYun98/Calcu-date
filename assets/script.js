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

// watchmode 
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
//         'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
//     }
// };

// fetch('https://watchmode.p.rapidapi.com/releases?start_date=20220301&end_date=20220312&limit=250', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// Love calculator
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
// 		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
// 	}
// };

// fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
var submitBtn = $("#search-form"); 
var yourNameEl = document.querySelector(".form-input-your");
var crushNameEl = document.querySelector(".form-input-crush");

function gettingInput(event) {
    event.preventDefault();
    var yourName = yourNameEl.value.trim();
    var crushName = crushNameEl.value.trim();
    if (!yourName || !crushName) {
        alert("you should write something!")
        return;
    }

    getCalculate(yourName, crushName)
    console.log('click');
}

function getCalculate(yourName, crushName) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8ffca2429dmsh13d60be90c10c46p18d30bjsn600828036fb6',
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
        }
    };

    fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + yourName + "&fname=" + crushName , options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));  
}

submitBtn.on('submit', gettingInput);