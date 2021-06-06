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

        <github-stats username="savepong" />
        <github-streak-stats username="savepong" />
        <github-top-langs langs-count="5" />
        <wakatime-stats username="savepong" />
      </div>
    );
  }
}

export default App;
