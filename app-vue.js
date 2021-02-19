const app = new Vue({
  el: "#app",
  data: {
    quote: "",
    author: "",
    quoteNumber: 0,
    twitterLink: "",
    isLoading: null,
  },
  beforeMount: function () {
    this.fetchNewQuote();
  },
  methods: {
    fetchNewQuote() {
      this.author = "",
      this.quote = "",
      this.isLoading = true
      fetch("https://type.fit/api/quotes")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          app.getQuoteNumber(0, data.length);
          app.renderQuote(data, app.quoteNumber);
          app.buildTwitterLink(app.quote, app.author);
        });
    },
    renderQuote(quotes, quoteNumber) {
      this.quote = quotes[quoteNumber].text;
      quotes[quoteNumber].author
        ? (this.author = quotes[quoteNumber].author)
        : (this.author = "Anonymus");
      this.isLoading = !this.isLoading
    },
    getQuoteNumber(min, max) {
      this.quoteNumber = Math.floor(Math.random() * (max - min)) + min;
    },
    buildTwitterLink(quote, author) {
      this.twitterLink = `https://twitter.com/intent/tweet?text=${quote}
     - ${author}`;
    },
  },
});
