document.addEventListener('DOMContentLoaded', ()=> {
    let quoteDisplay = document.getElementById('quoteDisplay');
    // Show new quote button
    let newQuote = document.getElementById('newQuote');
    // Quote input
    let newQuoteText = document.getElementById('newQuoteText');
    // Quote category input
    let newQuoteCategory = document.getElementById('newQuoteCategory');

    // Quotes and categories array
    let quotes = [
        {text: "The only way to do great work is to love what you do.", category: "Motivation" },
        {text: "Life is what happens when you're busy making other plans.", category: "Life" },
        {text: "Innovation distinguishes between a leader and a follower.", category: "Technology" }
    ];

    // Random quote displayer
    function showRandomQuote(){
        // Applying Math.random() property to trigger random selection
        let index = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[index];
        
        // Pushing random quotes to the displayer
        quoteDisplay.innerHTML = `<p>${randomQuote.text} - ${randomQuote.category}</p>`;
    }
    newQuote.addEventListener('click', showRandomQuote);

    // New quote addition
    function createAddQuoteForm(){

    }
});
