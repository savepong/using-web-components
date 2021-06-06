import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    showStockFinder: false,
  };
  render() {
    let stockFinder = null;
    if (this.state.showStockFinder) {
      stockFinder = <wc-stock-finder></wc-stock-finder>;
    }
    return (
      <div className="App">
        <wc-stock-price></wc-stock-price>
        {stockFinder}
        <button onClick={() => this.setState({ showStockFinder: true })}>
          Show Finder
        </button>
      </div>
    );
  }
}

export default App;
