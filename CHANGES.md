#20160926
- Project started
- Seemed page was not fully loaded when JavaScript ran but this turned out to not be the case. While trying to solve I tried several things:
 - Left this in the code: https://varvy.com/pagespeed/defer-loading-javascript.html
 - Tried this: 'onload' runs when the document as loaded so this function is call from the onload event:
 ````javascript
(function(window, document, undefined){
// code that should be taken care of right away
window.onload = init;
function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
  }
})(window, document, undefined);
````
