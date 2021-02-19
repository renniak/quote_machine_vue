function newQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderQuote(data, getQuoteNumber(0, data.length));
    });
}

function renderQuote(quotes, quoteNumber) {
  var quoteText = quotes[quoteNumber].text;
  var quoteAuthor = quotes[quoteNumber].author;

  document.getElementById("text").innerText = quoteText;
  if (quoteAuthor != null) {
    document.getElementById("author").innerText = "- " + quoteAuthor;
  } else {
    document.getElementById("author").innerText = "- Anonymus";
  }
  document.getElementById(
    "twitter-link"
  ).href = `https://twitter.com/intent/tweet?text=${
    document.getElementById("text").innerText
  }
   ${document.getElementById("author").innerText}`;
}

function getQuoteNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Events
addEventListener("DOMContentLoaded", function () {
  newQuote();
});

addEventListener("click", function (e) {
  if (e.target.id === "new-quote") {
    newQuote();
  }
});
