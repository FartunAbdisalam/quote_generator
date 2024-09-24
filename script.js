const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loader
function loading()
{
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loader
function complete()
{
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//generate quote
function  newQuote()
{
  loading();
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];

  if(quote.author=='Anonymous')
  {
    quoteAuthor.textContent = "Unknown";
  }
  else {
    quoteAuthor.textContent = quote.author;
  }

  // check if quote is long or short to determine the styling
  if(quote.text.length >120)
  {
    quoteText.classList.add('long-quote');
  }
  else{
    quoteText.classList.remove('long-quote');
  }
  //set quote & hide loading
  quoteText.textContent = quote.text;
  complete();
}

//get quotes from the API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  
  try {

  const response = await fetch(apiUrl);
   apiQuotes = await response.json();
   newQuote();

  }
  catch(error) {
    //catch the error
  }
  
}
function tweetQuote()
{
  const tweetterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweetterUrl, '_blank');
}

quoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



getQuotes();

