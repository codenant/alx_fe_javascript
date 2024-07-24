
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
function addQuote(createAddQuoteForm){
    // Retrieving value from input fields
    let quoteText = newQuoteText.value;
    let quoteCategory = newQuoteCategory.value;

    if(quoteText && quoteCategory){
        // Create new quote object that can be pushed to the quotes area and that takes input values
        let newQuotes = {text: quoteText, category: quoteCategory};
        quotes.push(newQuotes);

        let paragraph = document.createElement('p');
        let finalInput = document.createTextNode(`${quoteText} - ${quoteCategory}`);
        // Append the input to the paragraph
        paragraph.appendChild(finalInput);
        quoteDisplay.appendChild(paragraph);

        // Clear input fields
        newQuoteText.value = " ";
        newQuoteCategory.value = " ";
    } else {
            alert('Please enter a quote and a category.')
    }
}



