'use strict';

const index = require('./index-d9ecd93a.js');

/*
 Stencil Client Patch Browser v2.6.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('wcstockinfo.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["wc-spinner_3.cjs",[[1,"wc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"wc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"wcSymbolSelected","onStockSymbolSelected"]]],[1,"wc-spinner"]]]], options);
});
