import { makeAutoObservable, toJS } from "mobx";
import axios from "axios";

class QuotesStore {
  quotes = [];
  isLoading = false;
  author = "";

  constructor() {
    makeAutoObservable(this);
  }

  setQuotes(quotes) {
    this.quotes = quotes;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  setAuthor(author) {
    this.author = author;
  }

  async loadQuotes(url) {
    await axios(url).then(
      (resp) => (
        this.setQuotes(resp.data.data),
        this.setIsLoading(false),
        this.quotes.map((el) => this.setAuthor(el.quoteAuthor))
      )
    );
  }
}

const storeQ = new QuotesStore();

export default storeQ;
