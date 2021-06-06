import { Component, Event, h, State } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';
export class StockFinder {
  constructor() {
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
      this.searchResults = parsedRes['bestMatches'].map(match => {
        return {
          name: match['2. name'],
          symbol: match['1. symbol'],
        };
      });
      this.loading = false;
    })
      .catch(() => {
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.wcSymbolSelected.emit(symbol);
  }
  render() {
    let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
      h("strong", null, result.symbol),
      " - ",
      result.name)))));
    if (this.loading) {
      content = h("wc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) },
        h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }),
        h("button", { type: "submit" }, "Find")),
      content,
    ];
  }
  static get is() { return "wc-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./stock-finder.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get states() { return {
    "searchResults": {},
    "loading": {}
  }; }
  static get events() { return [{
      "method": "wcSymbolSelected",
      "name": "wcSymbolSelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
}
