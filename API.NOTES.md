# API NOTES

## Requirements

1. Can search for Wikipedia entries in a search box and see results
2. Can click button to see random Wikipedia entry



## Examples
* endPoint: https://en.wikipedia.org/w/api.php

### Return list of articles
#### Source
> "https://www.mediawiki.org/wiki/API:Opensearch
#### Query"
> "https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=10&namespace=0&format=jsonfm"



### Search by ?
> "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json"

### Get random article
> "https://en.wikipedia.org/wiki/Special:Random"

### Get the Extract (new json)
> "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow&formatversion=2"

### Try for 'horse'
> "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=horse&formatversion=2"

#### Take it apart
- https://en.wikipedia.org/w/api.php?
- format=jsonfm
- formatversion=2
- action=query
- generator=search
- gsrnamespace=0
- gsrlimit=10
- prop=pageimages|extracts
- pilimit=max
- exintro
- explaintext
- exsentences=1
- exlimit=max
- gsrsearch=horse



### This one gets images
> "https://en.wikipedia.org/w/api.php?action=query&titles=San_Francisco&prop=images&imlimit=20&format=jsonfm"

### JavaScript
#### Using jQuery
````javascript
$.ajax( {
    url: remoteUrlWithOrigin,
    data: queryData,
    dataType: 'json',
    type: 'POST',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
       // do something with data
    }
} );
````
#### Using mw.Api, specify it when creating the mw.Api object
````javascript
var api = new mw.Api( {
    ajax: {
        headers: { 'Api-User-Agent': 'Example/1.0' }
    }
} );
api.get( {...} ).done(function(data) {
    // do something with data
});
````
