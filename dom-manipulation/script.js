let quoteDisplay = document.getElementById('quoteDisplay');
// Show new quote button
let newQuote = document.getElementById('newQuote');
// Quote input
let newQuoteText = document.getElementById('newQuoteText');
// Quote category input
let newQuoteCategory = document.getElementById('newQuoteCategory');
// JSON export button
let download = document.getElementById('download');
let categoryFilter = document.getElementById('categoryFilter');

// Quotes and categories array
let quotes = [
    {text: "The only way to do great work is to love what you do.", category: "Motivation" },
    {text: "Life is what happens when you're busy making other plans.", category: "Life" },
    {text: "Innovation distinguishes between a leader and a follower.", category: "Technology" }
];

// Export quotes as JSON
download.addEventListener('click', () =>{
    // Convert the quotes array into a string
    let quotesJSON = JSON.stringify(quotes);
    // Create blob
    let blob = new Blob([quotesJSON], {type: "application/json"});
    // Create blob URL
    let downloadURL = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'quotes.json';
    // Trigger download
    link.click();
})

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

        // Store quotes into local storge
        localStorage.setItem('Quotes', JSON.stringify(quotes))

        // Update the dropdown menu with new categories
        let existingCategories = new Set();
        categoryFilter.querySelectorAll('option').forEach(option => existingCategories.add(option.value));
        let newCategories = new Set();
        quotes.map((quote) => newCategories.add(quote.category));

        newCategories.map((category) => {
            if (!existingCategories.has(category)) {
                let options = document.createElement('option');
                options.setAttribute('value', quotes.category.toLowerCase());
                options.textContent = quotes.category;
                categoryFilter.appendChild(options);
            }
        });

        // Display quotes
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

function filterQuotes() {
    // Retrieve the selected category from the dropdown
    let select = categoryFilter.value;
    
    // Clear the current display
    quoteDisplay.innerHTML = '';

    // Filter quotes based on the selected category
    let filteredQuotes = quotes.filter(quote => 
        select === 'all' || quote.category.toLowerCase() === select
    );

    // Display the filtered quotes
    filteredQuotes.map((quote) =>{
        let paragraph = document.createElement('p');
        let finalInput = document.createTextNode(`${quote.text} - ${quote.category}`);
        paragraph.appendChild(finalInput);
        quoteDisplay.appendChild(paragraph);
    });

    // Store selected category to local storage
    localStorage.setItem('Last Selected Category', select);
}

// Function that retrieves quotes from the local storage and displays it on inititaion
function retrieveStorage(){
    // Quotes retrieval and parsing into an array
    let storedQuotes = localStorage.getItem('Quotes');
    let parsedQuotes = JSON.parse(storedQuotes);

    // Pushing retrieved quotes into the array
    quotes.push(...parsedQuotes);

    // Mapping through the quotes array to display each stored quote on the webpage
    parsedQuotes.map((quotes) =>{
        let paragraph = document.createElement('p');
        let finalInput = document.createTextNode(`${quotes.text} - ${quotes.category}`);
        // Append the input to the paragraph
        paragraph.appendChild(finalInput);
        quoteDisplay.appendChild(paragraph);

        // Populate dropdown menu
        function populateCategories (){
            let options = document.createElement('option');
            options.setAttribute('value', quotes.category.toLowerCase());
            options.textContent = quotes.category;
            categoryFilter.appendChild(options);
        }
        populateCategories();
    });
    // Retrieve the last selected category
    let selectedCategory = localStorage.getItem('Last Selected Category');
    categoryFilter.value = selectedCategory;
    filterQuotes();
}
retrieveStorage();

// Import JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem('Quotes', JSON.stringify(quotes))
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }