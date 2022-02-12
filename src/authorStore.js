import axios from "axios";
import { makeAutoObservable } from "mobx";

class AuthorStore {
  multipleQuotes = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMultipleQuotes(multipleQuotes) {
    this.multipleQuotes = multipleQuotes;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async loadMultipleQuotes(url) {
    await axios(url).then(
      (resp) => (
        this.setMultipleQuotes(resp.data.data), this.setIsLoading(false)
      )
    );
  }
}

const storeA = new AuthorStore();

export default storeA;
