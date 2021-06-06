import { attachShadow, h, createEvent, Host, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const spinnerCss = ".lds-facebook{display:inline-block;position:relative;width:80px;height:80px}.lds-facebook div{display:inline-block;position:absolute;left:8px;width:16px;background:#750175;animation:lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite}.lds-facebook div:nth-child(1){left:8px;animation-delay:-0.24s}.lds-facebook div:nth-child(2){left:32px;animation-delay:-0.12s}.lds-facebook div:nth-child(3){left:56px;animation-delay:0}@keyframes lds-facebook{0%{top:8px;height:64px}50%,100%{top:24px;height:32px}}";

const Spinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h("div", { class: "lds-facebook" }, h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return spinnerCss; }
};

const AV_API_KEY = 'H5CXZZLKHTCMCD79';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100vh}form input{font:inherit;color:var(--color-primary, black);padding:0.15rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white);cursor:pointer}form button:hover,form button:active{background:var(--color-primary-highlight, gray);border-color:var(--color-primary-highlight, gray)}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

const StockFinder = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.wcSymbolSelected = createEvent(this, "wcSymbolSelected", 7);
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
    let content = (h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)))));
    if (this.loading) {
      content = h("wc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockNameInput = el) }), h("button", { type: "submit" }, "Find")),
      content,
    ];
  }
  static get style() { return stockFinderCss; }
};

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100vh}:host(.error){border-color:#e79804}form input{font:inherit;color:var(--color-primary, black);padding:0.15rem 0.25rem;display:block;margin-bottom:0.5rem;text-transform:uppercase}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white);cursor:pointer}form button:hover,form button:active{background:var(--color-primary-highlight, gray);border-color:var(--color-primary-highlight, gray)}form button:disabled{background:#ccc;border-color:#ccc;color:var(--color-primary-inverse, white);cursor:not-allowed}";

const StockPrice = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.stockInputValid = false;
    this.loading = false;
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    }
    else {
      this.stockInputValid = false;
    }
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(this.stockSymbol);
  }
  componentWillLoad() {
    console.log('componentWillLoad');
  }
  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }
  onStockSymbolSelected(event) {
    console.log('stock symbol selected', event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Invalid!');
      }
      return res.json();
    })
      .then(parsedRes => {
      if (!parsedRes['Global Quote']['05. price']) {
        throw new Error('Invalid symbol!');
      }
      this.error = null;
      this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      this.loading = false;
    })
      .catch(err => {
      this.error = err.message;
      this.fetchedPrice = null;
      this.loading = false;
    });
  }
  hostData() {
    return {
      class: this.error ? 'hydrated error' : '',
    };
  }
  __stencil_render() {
    let dataContent = h("p", null, "Please enter a symbol!");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.fetchedPrice) {
      dataContent = h("p", null, "Price: $", this.fetchedPrice);
    }
    if (this.loading) {
      dataContent = h("wc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => (this.stockInput = el), value: this.stockUserInput, onInput: this.onUserInput.bind(this), autofocus: true }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent),
    ];
  }
  get el() { return this; }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  static get style() { return stockPriceCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};

const WcSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"wc-spinner"]);
const WcStockFinder = /*@__PURE__*/proxyCustomElement(StockFinder, [1,"wc-stock-finder",{"searchResults":[32],"loading":[32]}]);
const WcStockPrice = /*@__PURE__*/proxyCustomElement(StockPrice, [1,"wc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"wcSymbolSelected","onStockSymbolSelected"]]]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      WcSpinner,
  WcStockFinder,
  WcStockPrice
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { WcSpinner, WcStockFinder, WcStockPrice, defineCustomElements };
